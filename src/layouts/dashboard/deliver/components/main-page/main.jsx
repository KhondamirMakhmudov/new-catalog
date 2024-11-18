const MainContent = ({ children }) => {
  return (
    <div className="col-span-9 p-[20px] border border-t border-l-0 border-b-0 border-r-0 font-gilroy">
      {children}
    </div>
  );
};

export default MainContent;
