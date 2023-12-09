const Onramper = () => {
  return (
    <iframe
      src={`https://buy.onramper.com?themeName=dark&containerColor=141416&primaryColor=883389&secondaryColor=3f3f43&cardColor=272727&primaryTextColor=ffffff&secondaryTextColor=ffffff&borderRadius=0.54&wgBorderRadius=100apiKey=${process.env.NEXT_PUBLIC_ONRAMPER_KEY}&defaultCrypto=ETH&supportRecurringPayments=true`}
      height='630px'
      width='550px'
      title='Onramper widget'
      allow='accelerometer; autoplay; camera; gyroscope; payment'></iframe>
  );
};

export default Onramper;
