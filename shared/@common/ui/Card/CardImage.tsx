import Image from 'next/image';

interface props {
  imageUrl: string;
  closed: boolean;
  width: string;
  height: string;
}
/**
 * 카드 내 이미지를 보여주는 컴포넌트
 * - 지난 공고의 경우 반투명한 레이어 및 문구 추가
 * @param imageUrl 이미지 경로
 * @param closed 닫힘 공고 여부
 * @param width 이미지 div의 가로 - ex : 312px , auto, full
 * @param height 이미지 div의 세로 - ex : 312px , auto, full
 * @returns
 */
const CardImage = ({ imageUrl, closed, width, height }: props) => {
  return (
    <div
      className={`flex justify-center items-center relative w-[${width}] h-[${height}]`}
    >
      <img className="rounded-2xl bg-cover w-full h-full" src={imageUrl} />
      {closed && (
        <>
          <div className="absolute items-center bg-black opacity-50 w-full h-full rounded-2xl"></div>
          <p className="absolute text-[28px] font-bold text-gray-30">
            지난 공고
          </p>
        </>
      )}
    </div>
  );
};

export default CardImage;