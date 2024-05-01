import React, { useState } from 'react';
import TableBody from '@/shared/@common/ui/Table/TableBody';
import TableHead from '@/shared/@common/ui/Table/TableHead';
import Pagination from '@/shared/@common/ui/Pagination/Pagination';

export interface TableProps {
  isEmployee: boolean;
  shopId?: string;
  noticeId?: string;
}

const Table = ({ isEmployee, shopId, noticeId }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <table className="inline-flex flex-col items-start rounded-2xl border-gray-20 border border-solid w-full">
        <TableHead isEmployee={isEmployee} />
        <TableBody
          isEmployee={isEmployee}
          shopId={shopId}
          noticeId={noticeId}
        />
        <Pagination
          totalPage={1}
          limit={1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </table>
    </>
  );
};

{
  /* 
  사장님 확인 용
  <Table
  id={users.id}
  userName={users.name}
  date={data.items.item.startsAt.slice(0, 10)}
  hour={data.items.item.startsAt.slice(12)}
  hourlypay={data.items.item.notice.item.hourlyPay}
  statuses={data.items.item.status}
/>; */
}
export default Table;
