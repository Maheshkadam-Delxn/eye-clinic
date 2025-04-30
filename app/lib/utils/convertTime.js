export function convertToTimeOnly(timeStr) {
    const [time, modifier] = timeStr.split(/(AM|PM)/);
    let [hours, minutes] = time.trim().split(":").map(Number);
  
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  
    // Create Date object with today's date but store only time part
    const timeOnly = new Date();
    timeOnly.setHours(hours, minutes, 0, 0);
    return timeOnly;
  }
  