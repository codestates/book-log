import ReviewInput from '../components/book/ReviewInput';

export default function ReviewInputPage({ bookInfo }) {
  const { title, thumbnail, contents } = bookInfo;
  return (
    <div>
      <div className="bookinfo">
        <img src={thumbnail} />
        <div className="booktitle">{title}</div>
        <div className="bookcontents">{contents}</div>
      </div>
      <ReviewInput bookInfo={bookInfo} />
    </div>
  );
}
