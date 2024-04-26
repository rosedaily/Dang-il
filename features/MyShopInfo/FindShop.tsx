import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Button from '@/shared/@common/ui/Button/Button';
import Image from 'next/image';
import FindNotice from './FindNotice';
import useFetch from '@/shared/@common/api/hooks/useFetch';
import shopAPI from '@/shared/@common/api/shopAPI';

interface ShopData {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
}

interface FindShopData {
  item: {
    item: ShopData;
  };
}

// 가게 상태에 따라 다른 div 출력
const FindShop = () => {
  const router = useRouter();

  const { data } = useFetch(() =>
    shopAPI.get('4490151c-5217-4157-b072-9c37b05bed47'),
  );

  let shop = [];
  if (data && data.item) {
    shop = data.item;
  }

  const handleWritingShopInfo = () => {
    /* 가게 등록하는 페이지로 이동시키기 */
    router.push('/registMyShop');
  };

  const handleEditingShopInfo = () => {
    /* 가게 정보 편집하는 페이지로 이동시키기 */
    router.push('/editMyShop');
  };

  const handleWritingNotice = () => {
    /* 공고 작성하는 페이지로 이동시키기 */
    router.push('/noticeRegist');
  };

  const [size, setSize] = useState('large');
  const isMobile = useMediaQuery({ query: '(min-width: 768px)' });
  const [isMyShop, setIsMyShop] = useState(true); // 가게 상태 추가

  useEffect(() => {
    if (isMobile) {
      setSize('large');
    } else {
      setSize('small');
    }
  }, [isMobile]);

  if (isMyShop) {
    return (
      <>
        <div className="inline-flex w-full p-6 justify-between items-start rounded-xl bg-purple-10">
          <Image
            src={shop.imageUrl}
            alt="내 가게 사진"
            width={200}
            height={200}
          />
          <div className="flex w-[346px] pt-4 flex-col justify-between items-start self-stretch">
            <div className="flex w-[346px] p-2 flex-col items-start gap-3">
              <div className="flex flex-col items-start gap-2">
                <p className=" text-primary font-bold text-base">
                  {shop.category}
                </p>
                <p className="text-black text-[28px] font-bold">{shop.name}</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <Image
                  src={`/images/icon-location-on.svg`}
                  alt="위치 로고"
                  width={20}
                  height={20}
                />
                <p className=" text-gray-50">
                  {shop.address1} {shop.address2}
                </p>
              </div>
              <p className="self-stretch text-black">{shop.description}</p>
            </div>
            <div className="flex items-start gap-2 self-stretch">
              <Button
                size="medium"
                color="none"
                onClick={handleEditingShopInfo}
              >
                편집하기
              </Button>
              <Button
                size="medium"
                color="colored"
                onClick={handleWritingNotice}
              >
                공고 등록하기
              </Button>
            </div>
          </div>
        </div>
        <FindNotice />
      </>
    );
  } else {
    return (
      <div className="flex w-full py-[60px] px-[24px] flex-col content-center items-center gap-6 rounded-xl border border-solid border-gray-20">
        <p className="text-black self-stretch text-center text-base">
          내 가게를 소개하고 공고도 등록해 보세요.
        </p>
        <Button size={size} color="colored" onClick={handleWritingShopInfo}>
          가게 등록하기
        </Button>
      </div>
    );
  }
};

export default FindShop;
