export const saveEarning = total_earning => {
    return {
      type: 'SAVE_EARNING',
      total_earning
    };
};