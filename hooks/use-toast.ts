
export const useToast = () => {
    type Toast = {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
    };
  const toast = (options: Toast) => {
    // Implement your toast logic here
    console.log("Toast:", options);
  };

  return {
    toast,
  };
}
