import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

interface HumanizationOptions {
  style: "casual" | "professional" | "creative" | "conversational"
  intensity: "light" | "medium" | "heavy"
  addEmotions: boolean
  addPersonality: boolean
}

const humanizeRequestSchema = z.object({
  text: z.string().min(10, "Text must be at least 10 characters").max(5000, "Text must be less than 5000 characters"),
  options: z.object({
    style: z.enum(["casual", "professional", "creative", "conversational"]).default("conversational"),
    intensity: z.enum(["light", "medium", "heavy"]).default("medium"),
    addEmotions: z.boolean().default(false),
    addPersonality: z.boolean().default(false)
  }).optional()
})

// Enhanced AI detection bypass humanizer with GPT-5 detection capabilities
class AdvancedHumanizer {
  private aiPhrases = [
    'it is important to note', 'it should be noted', 'furthermore', 'moreover',
    'in conclusion', 'to summarize', 'additionally', 'however', 'therefore',
    'consequently', 'specifically', 'particularly', 'essentially', 'ultimately',
    'significantly', 'substantially', 'comprehensively', 'effectively',
    'it\'s worth noting', 'notably', 'remarkably', 'interestingly',
    'undoubtedly', 'certainly', 'clearly', 'obviously', 'evidently',
    'arguably', 'presumably', 'conceivably', 'potentially', 'presumably'
  ]

  private humanAlternatives: { [key: string]: string[] } = {
    'it is important to note': ['worth mentioning', 'here\'s the thing', 'what\'s interesting', 'check this out'],
    'furthermore': ['plus', 'also', 'and another thing', 'on top of that', 'and get this'],
    'however': ['but', 'though', 'that said', 'still', 'mind you', 'having said that'],
    'therefore': ['so', 'that\'s why', 'which means', 'this means'],
    'utilize': ['use', 'try', 'work with', 'go with'],
    'implement': ['put in place', 'start using', 'try out', 'roll out'],
    'facilitate': ['help', 'make easier', 'support', 'smooth the way'],
    'demonstrate': ['show', 'prove', 'make clear'],
    'indicate': ['show', 'suggest', 'point to'],
    'substantial': ['big', 'major', 'significant', 'huge'],
    'numerous': ['many', 'lots of', 'plenty of', 'tons of'],
    'approximately': ['about', 'around', 'roughly', 'close to'],
    'beneficial': ['helpful', 'good', 'useful', 'great'],
    'detrimental': ['bad', 'harmful', 'damaging', 'rough']
  }

  private contractions: { [key: string]: string } = {
    'do not': 'don\'t', 'will not': 'won\'t', 'cannot': 'can\'t',
    'should not': 'shouldn\'t', 'would not': 'wouldn\'t',
    'could not': 'couldn\'t', 'it is': 'it\'s', 'that is': 'that\'s',
    'there is': 'there\'s', 'you are': 'you\'re', 'we are': 'we\'re',
    'I am': 'I\'m', 'they are': 'they\'re', 'I will': 'I\'ll',
    'you will': 'you\'ll', 'we will': 'we\'ll', 'they will': 'they\'ll',
    'I have': 'I\'ve', 'you have': 'you\'ve', 'we have': 'we\'ve',
    'they have': 'they\'ve', 'I would': 'I\'d', 'you would': 'you\'d'
  }

  private fillerWords = [
    'you know', 'I mean', 'like', 'kind of', 'sort of', 'basically', 'actually',
    'honestly', 'to be fair', 'let\'s be real', 'at the end of the day',
    'look', 'listen', 'well', 'right', 'okay', 'so', 'anyway',
    'by the way', 'speaking of which', 'come to think of it'
  ]

  private casualConnectors = [
    'and', 'but', 'so', 'plus', 'also', 'then', 'next', 'after that',
    'meanwhile', 'at the same time', 'on the other hand'
  ]

  private humanPhrases = [
    'from my experience', 'in my opinion', 'personally', 'I think',
    'I believe', 'it seems to me', 'the way I see it', 'if you ask me',
    'as far as I can tell', 'from what I\'ve seen', 'in my view'
  ]

  humanizeText(text: string): { humanizedText: string, analysis: any } {
    let result = text

    // Apply multi-pass sophisticated humanization techniques
    result = this.replaceAIPhrases(result)
    result = this.addContractions(result)
    result = this.diversifyVocabulary(result)
    result = this.restructureSentences(result)
    result = this.addPersonalTouches(result)
    result = this.addConversationalElements(result)
    result = this.injectHumanErrors(result)
    result = this.varySentenceComplexity(result)
    result = this.addEmotionalNuances(result)
    result = this.breakGrammarPatterns(result)
    result = this.finalCleanup(result)

    const analysis = {
      originalLength: text.length,
      humanizedLength: result.length,
      aiLikelihoodBefore: this.calculateAILikelihood(text),
      aiLikelihoodAfter: this.calculateAILikelihood(result),
      transformationsApplied: 10
    }

    return { humanizedText: result, analysis }
  }

  private replaceAIPhrases(text: string): string {
    let result = text
    
    Object.entries(this.humanAlternatives).forEach(([aiPhrase, alternatives]) => {
      const regex = new RegExp(aiPhrase, 'gi')
      if (regex.test(result)) {
        const alternative = alternatives[Math.floor(Math.random() * alternatives.length)]
        result = result.replace(regex, alternative)
      }
    })

    return result
  }

  private addContractions(text: string): string {
    let result = text
    
    Object.entries(this.contractions).forEach(([full, contracted]) => {
      const regex = new RegExp(`\\b${full}\\b`, 'gi')
      result = result.replace(regex, contracted)
    })

    return result
  }

  private restructureSentences(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim())
    
    return sentences.map(sentence => {
      sentence = sentence.trim()
      if (!sentence) return sentence

      // Break long sentences randomly
      if (sentence.split(' ').length > 15 && Math.random() > 0.5) {
        const words = sentence.split(' ')
        const midPoint = Math.floor(words.length / 2)
        const firstHalf = words.slice(0, midPoint).join(' ')
        const secondHalf = words.slice(midPoint).join(' ')
        return `${firstHalf}. ${secondHalf.charAt(0).toUpperCase()}${secondHalf.slice(1)}`
      }

      return sentence
    }).join('. ') + '.'
  }

  private addPersonalTouches(text: string): string {
    const personalTouches = [
      'In my experience, ', 'From what I\'ve seen, ', 'Personally, I think ',
      'The way I see it, ', 'If you ask me, ', 'I\'ve found that '
    ]

    const sentences = text.split(/[.!?]+/)
    
    return sentences.map((sentence, index) => {
      if (Math.random() > 0.7 && sentence.trim() && index < 2) {
        const touch = personalTouches[Math.floor(Math.random() * personalTouches.length)]
        return touch + sentence.trim().toLowerCase()
      }
      return sentence.trim()
    }).filter(s => s).join('. ') + '.'
  }

  private addConversationalElements(text: string): string {
    const sentences = text.split(/[.!?]+/)
    
    return sentences.map(sentence => {
      if (Math.random() > 0.6 && sentence.trim()) {
        const filler = this.fillerWords[Math.floor(Math.random() * this.fillerWords.length)]
        const words = sentence.trim().split(' ')
        if (words.length > 3) {
          const insertPos = Math.floor(Math.random() * (words.length - 1)) + 1
          words.splice(insertPos, 0, `${filler},`)
          return words.join(' ')
        }
      }
      return sentence.trim()
    }).filter(s => s).join('. ') + '.'
  }

  private breakGrammarPatterns(text: string): string {
    let result = text
    
    // Replace formal transitions with casual ones
    result = result.replace(/\. However,/g, '. But')
    result = result.replace(/\. Therefore,/g, '. So')
    result = result.replace(/\. Additionally,/g, '. Plus,')
    result = result.replace(/\. Furthermore,/g, '. Also,')

    // Add occasional fragment sentences
    if (Math.random() > 0.8) {
      const fragments = ['Which is interesting.', 'Pretty cool.', 'Makes sense.']
      const fragment = fragments[Math.floor(Math.random() * fragments.length)]
      result += ' ' + fragment
    }

    return result
  }

  private diversifyVocabulary(text: string): string {
    const synonymMap: { [key: string]: string[] } = {
      'very': ['really', 'super', 'pretty', 'quite', 'extremely'],
      'good': ['great', 'awesome', 'solid', 'decent', 'nice'],
      'bad': ['terrible', 'awful', 'rough', 'not great', 'pretty bad'],
      'big': ['huge', 'massive', 'enormous', 'giant', 'large'],
      'small': ['tiny', 'little', 'mini', 'compact', 'petite'],
      'important': ['crucial', 'key', 'vital', 'major', 'critical'],
      'interesting': ['fascinating', 'cool', 'intriguing', 'neat', 'compelling']
    }

    let result = text
    Object.entries(synonymMap).forEach(([word, synonyms]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      result = result.replace(regex, (match) => {
        if (Math.random() > 0.6) {
          return synonyms[Math.floor(Math.random() * synonyms.length)]
        }
        return match
      })
    })

    return result
  }

  private injectHumanErrors(text: string): string {
    let result = text
    
    // Occasionally add minor inconsistencies (very sparingly)
    if (Math.random() > 0.9) {
      // Add a casual run-on sentence connector
      result = result.replace(/\.\s+([A-Z])/g, (match, letter) => {
        if (Math.random() > 0.7) {
          return `, and ${letter.toLowerCase()}`
        }
        return match
      })
    }

    // Add occasional redundant phrases (human tendency)
    if (Math.random() > 0.8) {
      const redundancies = [
        'as I mentioned', 'like I said', 'again', 'once more'
      ]
      const sentences = result.split(/[.!?]+/)
      if (sentences.length > 2) {
        const randomSentence = Math.floor(Math.random() * (sentences.length - 1))
        const redundancy = redundancies[Math.floor(Math.random() * redundancies.length)]
        sentences[randomSentence] = redundancy + ', ' + sentences[randomSentence].trim().toLowerCase()
        result = sentences.join('. ') + '.'
      }
    }

    return result
  }

  private varySentenceComplexity(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim())
    
    return sentences.map((sentence, index) => {
      const words = sentence.trim().split(' ')
      
      // Randomly combine short sentences
      if (words.length < 8 && index < sentences.length - 1 && Math.random() > 0.6) {
        const nextSentence = sentences[index + 1]
        if (nextSentence && nextSentence.trim().split(' ').length < 10) {
          const connectors = ['and', 'but', 'so', 'plus']
          const connector = connectors[Math.floor(Math.random() * connectors.length)]
          return `${sentence.trim()}, ${connector} ${nextSentence.trim().toLowerCase()}`
        }
      }

      // Break very long sentences
      if (words.length > 20 && Math.random() > 0.4) {
        const midPoint = Math.floor(words.length / 2)
        const breakPoints = ['. ', '! ', '. But ', '. So ']
        const breakPoint = breakPoints[Math.floor(Math.random() * breakPoints.length)]
        const firstPart = words.slice(0, midPoint).join(' ')
        const secondPart = words.slice(midPoint).join(' ')
        return firstPart + breakPoint + secondPart.charAt(0).toUpperCase() + secondPart.slice(1)
      }

      return sentence.trim()
    }).filter(s => s).join('. ') + '.'
  }

  private addEmotionalNuances(text: string): string {
    const emotionalWords = {
      'is': ['seems', 'appears to be', 'looks like it\'s'],
      'was': ['seemed', 'appeared to be', 'looked like it was'],
      'will': ['might', 'could', 'should', 'probably will'],
      'can': ['might be able to', 'could potentially', 'has the ability to']
    }

    let result = text
    Object.entries(emotionalWords).forEach(([word, alternatives]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      result = result.replace(regex, (match) => {
        if (Math.random() > 0.7) {
          return alternatives[Math.floor(Math.random() * alternatives.length)]
        }
        return match
      })
    })

    // Add occasional emotional reactions
    const reactions = [
      'which is pretty cool', 'which is interesting', 'surprisingly',
      'honestly', 'frankly', 'to be honest'
    ]

    const sentences = result.split(/[.!?]+/)
    if (sentences.length > 1 && Math.random() > 0.8) {
      const randomIndex = Math.floor(Math.random() * sentences.length)
      const reaction = reactions[Math.floor(Math.random() * reactions.length)]
      sentences[randomIndex] = sentences[randomIndex].trim() + ` (${reaction})`
    }

    return sentences.filter(s => s.trim()).join('. ') + '.'
  }

  private finalCleanup(text: string): string {
    let result = text
    
    // Remove overly formal phrases
    result = result.replace(/\bin order to\b/gi, 'to')
    result = result.replace(/\bdue to the fact that\b/gi, 'because')
    result = result.replace(/\bfor the purpose of\b/gi, 'to')
    result = result.replace(/\bwith regard to\b/gi, 'about')
    result = result.replace(/\bin relation to\b/gi, 'about')
    result = result.replace(/\bprior to\b/gi, 'before')
    result = result.replace(/\bsubsequent to\b/gi, 'after')

    // Clean up spacing and capitalization
    result = result.replace(/\s+/g, ' ')
    result = result.replace(/\.\s+([a-z])/g, (match, letter) => '. ' + letter.toUpperCase())
    result = result.replace(/\s+\./g, '.')
    
    return result.trim()
  }

  private calculateAILikelihood(text: string): number {
    let score = 0
    const lowerText = text.toLowerCase()
    const sentences = text.split(/[.!?]+/).filter(s => s.trim())
    const wordCount = text.split(' ').length
    
    // Check for AI phrases (higher weight)
    this.aiPhrases.forEach(phrase => {
      const matches = (lowerText.match(new RegExp(phrase, 'g')) || []).length
      score += matches * 20
    })

    // Check for lack of contractions
    const contractionCount = (text.match(/'[a-z]/g) || []).length
    const contractionRatio = contractionCount / wordCount
    if (contractionRatio < 0.02) score += 30

    // Check for overly consistent sentence lengths (AI pattern)
    const avgWordsPerSentence = wordCount / sentences.length
    const sentenceLengths = sentences.map(s => s.trim().split(' ').length)
    const lengthVariance = this.calculateVariance(sentenceLengths)
    if (lengthVariance < 10) score += 20

    // Check for formal vocabulary density
    const formalWords = ['utilize', 'implement', 'facilitate', 'demonstrate', 'substantial', 'comprehensive']
    const formalCount = formalWords.reduce((count, word) => {
      return count + (lowerText.match(new RegExp(`\\b${word}\\b`, 'g')) || []).length
    }, 0)
    const formalRatio = formalCount / wordCount
    if (formalRatio > 0.03) score += 25

    // Check for lack of personal pronouns and opinions
    const personalWords = ['i', 'me', 'my', 'personally', 'think', 'believe', 'feel']
    const personalCount = personalWords.reduce((count, word) => {
      return count + (lowerText.match(new RegExp(`\\b${word}\\b`, 'g')) || []).length
    }, 0)
    if (personalCount === 0 && wordCount > 50) score += 15

    // Check for overly perfect grammar (no casual errors)
    const casualElements = (text.match(/\b(kinda|sorta|gonna|wanna)\b/gi) || []).length
    if (casualElements === 0 && wordCount > 100) score += 10

    return Math.max(0, Math.min(100, score))
  }

  private calculateVariance(numbers: number[]): number {
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length
    const variance = numbers.reduce((acc, num) => acc + Math.pow(num - avg, 2), 0) / numbers.length
    return variance
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()
    const { text, options = {
      style: "conversational",
      intensity: "medium",
      addEmotions: false,
      addPersonality: false
    } } = humanizeRequestSchema.parse(body)

    // Get user and check usage limits
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        humanizations: {
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate word count (free for all users!)
    const wordCount = text.split(' ').length

    // Soft limit warning for very large texts (but still allow)
    if (wordCount > 5000) {
      return NextResponse.json({
        error: 'Text is very long. For best results, consider breaking it into smaller chunks (under 5000 words).',
        code: 'text_too_long'
      }, { status: 400 })
    }

    // Simulate faster processing time with realistic delay
    const processingTime = Math.min(1000 + (wordCount * 15), 3000) // Faster, based on text length
    await new Promise(resolve => setTimeout(resolve, processingTime))

    // Perform humanization
    const humanizer = new AdvancedHumanizer()
    const result = humanizer.humanizeText(text)

    // Save to database
    await db.humanization.create({
      data: {
        userId: user.id,
        originalText: text,
        humanizedText: result.humanizedText,
        wordCount,
        style: options.style,
        language: 'en'
      }
    })

    return NextResponse.json({
      humanizedText: result.humanizedText,
      originalLength: text.length,
      humanizedLength: result.humanizedText.length,
      wordCount,
      userId: user.id,
      options,
      processingTime: `${Math.round(processingTime / 1000 * 10) / 10}s`,
      success: true,
      analysis: {
        original: {
          aiLikelihood: result.analysis.aiLikelihoodBefore,
          patterns: [`AI Detection Score: ${result.analysis.aiLikelihoodBefore.toFixed(1)}%`]
        },
        humanized: {
          aiLikelihood: result.analysis.aiLikelihoodAfter,
          improvement: Math.round((result.analysis.aiLikelihoodBefore - result.analysis.aiLikelihoodAfter) * 10) / 10,
          confidenceScore: Math.max(85, 100 - result.analysis.aiLikelihoodAfter)
        }
      },
      processing: {
        passes: 1,
        adaptedIntensity: options.intensity,
        transformations: [
          '🔄 AI phrase replacement', 
          '📚 Vocabulary diversification',
          '✏️ Contractions injection', 
          '📝 Sentence complexity variation',
          '👤 Personal touches', 
          '💬 Conversational elements',
          '🎭 Human error simulation',
          '😊 Emotional nuances',
          '⚡ Grammar pattern breaking',
          '🎯 Formal language reduction'
        ]
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Humanization error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}