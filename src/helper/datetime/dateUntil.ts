export const getCurrentDateTime = (): string => {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Bangkok'
  };
    const str = now.toLocaleString('en-US', options);
    
  const [month, day, year, time] = str.split(/[\s,\/]+/);
  return `${year}-${month}-${day} ${time}`;
};
