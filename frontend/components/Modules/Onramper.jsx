const Onramper = () => {
  return (
    <iframe
      src={`https://buy.onramper.com?themeName=sushi&apiKey=${process.env.NEXT_PUBLIC_ONRAMPER_KEY}&defaultCrypto=ETH&supportRecurringPayments=true`}
      height='630px'
      width='550px'
      title='Onramper widget'
      allow='accelerometer; autoplay; camera; gyroscope; payment'></iframe>
  );
};

export default Onramper;
