const getCurrencySign = (currency: string) => {
  switch (currency) {
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    case 'gbp':
      return '£';
  }
};

const formatDate = (time: number) => {
  const date = new Date(time);
  const day = date.getDate();
  const monthNo = date.getMonth();
  let month = '';

  switch (monthNo) {
    case 0:
      month = 'Jan';
      break;
    case 1:
      month = 'Feb';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'Aug';
      break;
    case 8:
      month = 'Sep';
      break;
    case 9:
      month = 'Oct';
      break;
    case 10:
      month = 'Nov';
      break;
    case 11:
      month = 'Dec';
  }

  return month + day;
};

const formatChartData = (data: [number, number][]) => (
    data.map(priceData => ({
        date: formatDate(priceData[0]),
        price: priceData[1]
    }))
);

export { getCurrencySign, formatChartData };
