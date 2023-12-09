const AssetsHeader = ({ headers }) => {
  return (
    <ul className='flex w-full py-4 font-light text-[#737373] text-sm border-b-[1px] border-[#161616]'>
      {headers.map((header, index) => (
        <li
          key={index}
          className={`pl-4 flex-1`}>
          {header.title}
        </li>
      ))}
    </ul>
  );
};

export default AssetsHeader;
