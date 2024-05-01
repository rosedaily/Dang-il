import React from 'react';
import useFetch from '../../api/hooks/useFetch';
import applicationAPI from '../../api/applicationAPI';
import TableButton from './TableButton';
import { TableProps } from './Table';

interface EmployeeItemData {
  id: string;
  name: string;
  bio: string;
  phone: string;
}

interface EmployeeData {
  item: {
    status: string;
    user: {
      item: {
        item: EmployeeItemData;
      };
    };
  };
}

interface EmployerItemData {
  id: string;
  name: string;
  startsAt: string;
  hourlyPay: number;
  workhour: number;
  description: string;
}

interface EmployerData {
  item: {
    notice: {
      item: {
        item: EmployerItemData;
      };
    };
  };
}

const TableBody = ({ isEmployee, shopId, noticeId }: TableProps) => {
  const { data, loading, error, execute } = useFetch(() => {
    return applicationAPI.getApplicationListData({
      shop_id: shopId as string,
      notice_id: noticeId as string,
    });
  });

  let employee = [];
  if (data && data.items) {
    employee = data.items.map((v: EmployeeData) => v.item.user.item);
  }

  let employeeStatus = [];
  if (data && data.items) {
    employeeStatus = data.items.map((v: EmployeeData) => v.item.status);
  }

  let employer = [];
  if (data && data.items) {
    employer = data.items.map((v: EmployerData) => v.item.notice.item);
  }

  let applicationId = '';
  if (data && data.items) {
    const foundItem = data.items.find(
      (v: EmployeeData) =>
        v.item &&
        v.item.user &&
        v.item.user.item &&
        v.item.user.item.item &&
        v.item.user.item.item.id,
    );

    if (foundItem) {
      applicationId = foundItem.item.user.item.item.id;
    }
  }

  const status = 'accepted' || 'rejected';

  return (
    <tbody className="flex flex-col w-full h-full items-start bg-white">
      {isEmployee
        ? employee &&
          shopId &&
          noticeId &&
          status &&
          employee.slice(0, 4).map((v: EmployeeItemData) => (
            <tr className="flex w-full">
              <td
                key={v.id}
                className="flex w-1/4 py-8 px-3 items-center gap-3 flex-shrink-0 self-stretch border-b-gray-20"
              >
                {v.name}
              </td>
              <td
                key={v.id}
                className="flex w-1/4 py-5 px-3 items-center gap-3 flex-shrink-1 self-stretch border-b-gray-20 overflow-x-scroll whitespace-pre scrollbar-hide"
              >
                {v.bio}
              </td>
              <td
                key={v.id}
                className="flex w-1/4 py-5 px-4 items-center gap-3 flex-shrink-1 self-stretch border-b-gray-20 overflow-auto whitespace-pre"
              >
                {v.phone}
              </td>
              <td className="flex w-1/4 py-5 px-3 items-center gap-3 flex-shrink-0 self-stretch border-b-gray-20 ">
                <TableButton
                  key={v.id}
                  onClick={() => {
                    applicationAPI.put(
                      shopId as string,
                      noticeId as string,
                      v.id,
                      status,
                    );
                  }}
                />
              </td>
            </tr>
          ))
        : employer &&
          employer.slice(0, 4).map((v: EmployerItemData) => (
            <tr className="flex w-full">
              <td
                key={v.id}
                className="flex w-1/4 py-8 px-3 items-center gap-3 flex-shrink-0 self-stretch border-b-gray-20"
              >
                {v.description}
              </td>
              <td
                key={v.id}
                className="flex w-1/4 py-5 px-3 items-center gap-3 flex-shrink-1 self-stretch border-b-gray-20 overflow-x-scroll whitespace-pre scrollbar-hide"
              >
                {v.startsAt.slice(0, 10)} {v.startsAt.slice(12, 13)}~
                {Number(v.startsAt.slice(12, 13)) + Number(v.workhour)}시
              </td>
              <td
                key={v.id}
                className="flex w-1/4 py-5 px-4 items-center gap-3 flex-shrink-1 self-stretch border-b-gray-20 overflow-auto whitespace-pre"
              >
                {v.hourlyPay}
              </td>
              <td className="flex w-1/5 py-5 px-3 items-center gap-3 flex-shrink-0 self-stretch border-b-gray-20 overflow-auto whitespace-pre">
                {status ? (
                  <p
                    className={`p-4 ${
                      status === '거절'
                        ? 'bg-purple-20 text-purple-40'
                        : 'bg-blue-10 text-blue-20'
                    } flex py-1 px-2 content-center items-center rounded-2xl font-bold text-sm`}
                  >
                    {status}
                  </p>
                ) : (
                  <p className="p-4 flex py-1 px-2 content-center items-center rounded-2xl font-bold text-sm bg-green-10 text-green-20">
                    대기중
                  </p>
                )}
              </td>
            </tr>
          ))}
    </tbody>
  );
};

export default TableBody;
