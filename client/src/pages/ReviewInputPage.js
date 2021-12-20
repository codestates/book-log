import ReviewInput from '../components/book/ReviewInput';

export default function ReviewInputPage({ bookInfo }) {
  const title = bookInfo[1];
  const thumbnail = bookInfo[2];
  const contents = bookInfo[3];
  return (
    <div>
      <div className="bookinfo">
        <img src={thumbnail} />
        <div className="booktitle">{title}</div>
        <div className="bookcontents">{contents}</div>
      </div>
      <ReviewInput />
    </div>
  );
}
