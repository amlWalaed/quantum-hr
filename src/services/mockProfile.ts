export const mockUpdateProfile = (
  data: ProfileUpdateData
): Promise<ProfileUpdateData> => {
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      // Simulate validation
      if (!data.name.first.trim() || !data.name.last.trim()) {
        reject(new Error("Name fields are required"));
        return;
      }

      if (!data.jobTitle.trim()) {
        reject(new Error("Job title is required"));
        return;
      }

      if (data.yearsOfExperience < 0) {
        reject(new Error("Years of experience must be a positive number"));
        return;
      }

      // Simulate success
      resolve(data);
    }, delay);
  });
};
