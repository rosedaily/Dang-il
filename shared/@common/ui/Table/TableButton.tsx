
interface ButtonComponentProps {
  handleClick: (buttons: string) => void;
}

const TableButton: React.FC<ButtonComponentProps> = ({ handleClick, buttonVisible, status }) => {
  return (
    <>
      {buttonVisible && (
        <>
          <button className="border-red-30 flex py-2 px-3 content-center items-center rounded-md border border-solid " onClick={() => handleClick('reject')}>
            <p className="text-red-40 font-bold text-sm">거절하기</p>
          </button>  
          <button className="border-blue-20 flex py-2 px-3 content-center items-center rounded-md border border-solid" onClick={() => handleClick('approve')}>
            <p className="text-blue-20 font-bold text-sm">승인하기</p>
          </button>  
        </>
      )}
      {status && <p className={`p-4 ${status === '거절' ? 'bg-purple-20 text-purple-50' : 'bg-blue-10 text-blue-20'} flex py-1 px-2 content-center items-center rounded-2xl font-bold text-sm`}>{status}</p>}
    </>
  );
};

export default TableButton;