export interface GlobalState {
    isAuthenticated: boolean | string;
    filesData: any[]; // Adjust the type as per your actual data structure
    activeUsers?: any[]; // Adjust the type as per your actual data structure
    currentUser: {
      profilePhoto: string;
      userName: string;
      email: string;
    };
    currentActiveTab: string;
  }