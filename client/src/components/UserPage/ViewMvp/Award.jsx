//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryGet } from "./../../../utils/useQuery";

const Award = ({ setEditState, award, setAward, isPdf, othersData }) => {
  const isToken = localStorage.getItem("token");
  const { data } = useQueryGet("/award", "getAward", { enabled: !!isToken });

  const [awardData, setAwardData] = useState(null);

  useEffect(() => {
    setAwardData(othersData ?? data);
  }, [othersData, data]);

  const onEdit = (item) => {
    setEditState(true);
    setAward({
      ...award,
      name: item.name,
      date: item.date,
      _id: item._id,
    });
  };

  return (
    <ul>
      {awardData?.map((item) => (
        <li
          key={item._id}
          className={`text-black border p-3 rounded-xl mt-2 dark:bg-${
            isPdf ? "white" : "neutral-800 dark:border-neutral-600"
          } `}
        >
          <div>
            <p className="flex justify-between mb-2">
              <span
                className={`text-lg dark:text-${!isPdf && "white"} leading-10`}
              >
                {item.name}
              </span>
              <button
                className={`text-blue-400 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                  isPdf || othersData ? " hidden" : ""
                }`}
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-${
                !isPdf && "neutral-600"
              } leading-10`}
            >
              수상 날짜
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              {item.date}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Award;
