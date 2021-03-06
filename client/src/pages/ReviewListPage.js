import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import PageTitle from '../components/PageTitle';

const BeforeLoginModal = styled(Modal)``;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 60%;
  height: 50rem;
  border-radius: 40px;
  margin: auto;
  padding: 3rem;
  font-size: 14px;
  margin-top: 2rem;
`;

const ContentContainer = styled.div``;

const ReviewContents = styled.div`
  margin: 0rem 2rem;
  padding: 1rem 2rem;
  background-color: white;
  height: 23rem;
  border-radius: 1rem;
`;

const ReviewDataContainer = styled.div``;

const PageContainer = styled.div`
  padding: 0rem 4rem;
  width: 20rem;
  margin-top: -2rem;
`;

const SubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  line-height: 2rem;
  padding-left: 1rem;
`;

const Page = styled.div`
  padding: 0.4rem 0.6rem;
  margin: 0.2rem 0.3rem;
  width: 10rem;
  background: rgba(255, 255, 255);
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const DataContainer = styled.div`
  display: flex;
  padding: 2rem 3rem;
  margin-bottom: 1rem;
`;

const WriteBtn = styled.button`
  padding: 0.3rem 0.7rem;
  background-color: #0b3961;
  border-radius: 0.2rem;
  color: white;
  border: none;
  height: 2.2rem;
  width: 6rem;
  margin-right: 2rem;
  box-shadow: 1px 1px 1px grey;
`;

const WriteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PagesContainer = styled.div`
  overflow-y: scroll;
  height: 11.3rem;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    padding: 1px;
  }
`;

const ReviewDate = styled.select`
  padding: 0.3rem 0.7rem;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -2.5rem;
  padding-bottom: 1rem;
  margin-right: 1rem;
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7edde;
  height: 16.2rem;
  border-radius: 0.7rem;
`;

const ReviewMain = styled.div`
  padding: 1.5rem 2rem;
`;

const ReviewText = styled.div`
  height: 11rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    padding: 1px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditBtn = styled.button`
  padding: 0.3rem 0.7rem;
  background-color: #0b3961;
  border-radius: 0.2rem;
  color: white;
  border: none;
  height: 2rem;
  width: 6rem;
  box-shadow: 1px 1px 1px grey;
  font-weight: 600;
`;

const DelBtn = styled.button`
  padding: 0.3rem 0.7rem;
  background-color: #e4977f;
  border-radius: 0.2rem;
  color: white;
  border: none;
  height: 2rem;
  width: 6rem;
  margin-right: 1rem;
  box-shadow: 1px 1px 1px grey;
  font-weight: 600;
`;

const Image = styled.img`
  object-fit: cover;
  height: 14rem;
  margin-top: -2rem;
  margin-left: 2rem;
`;

const ReviewListPage = ({
  handleCurrentbook,
  currentBook,
  isLogin,
  useTitle,
}) => {
  axios.defaults.withCredentials = true;
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [nowReview, setNowReview] = useState({});
  const [nowBook, setNowBook] = useState({ title: '' });

  useTitle('????????? ?????? ??????');
  const { book_id } = currentBook;

  const { state } = useLocation();
  console.log(nowBook);
  useEffect(() => {
    console.log(state);
    const bookId = state ? state.book_id : book_id;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/book/${bookId}/review`)
      .then((result) => {
        const { book_data, review_list } = result.data.data;
        setReviewList(review_list);
        console.log(book_data);
        setNowBook(book_data);
      });
  }, [book_id, selectedPage]);

  useEffect(() => {}, [selectedPage]);

  const handleView = (review, idx) => {
    // ????????? ??? ???????????? ????????????
    const { page, reviews } = review;
    setSelectedPage(review);
  };

  const handleChange = (option) => {
    const idx = option.target.value;
    setNowReview(selectedPage.reviews[idx]);
  };

  const handleWriting = () => {
    navigate('/reviewinput', {
      state: {
        bookInfo: { ...nowBook, authors: [nowBook.author] },
      },
    }); // ?????? ???????????? ??? ???????????? ?????? ???????????????
  };

  const handleEdit = () => {
    // ?????? ???????????? ??????
    // ????????? ????????? => ?????? ?????????, ?????? ?????????(?????????, ??????), ??? ??????
    navigate('/reviewinput', {
      state: {
        bookInfo: { ...nowBook, authors: [nowBook.author] },
        reviewContent: { page: selectedPage.page, ...nowReview },
      },
    });
  };

  const handleDel = () => {
    // ????????? ?????? ?????? api ??????
    console.log(nowReview);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/book/remove/${nowReview.review_id}`
      )
      .then((result) => {
        if (result.status === 200) {
          if (result.data.data.delete) {
            navigate('/booklist');
          } else {
            setSelectedPage('');
            setNowReview({});
          }
          console.log(result);
        }
      })
      .catch((err) => {
        setErrorMessage('????????? ????????? ????????????. ?????? ??? ??????????????????.');
      });
  };

  return (
    <>
      {isLogin ? (
        <Container>
          <PageTitle>'{nowBook.title.slice(0, 20)}' ?????? ??????</PageTitle>
          <WriteContainer>
            <WriteBtn onClick={handleWriting}>????????????</WriteBtn>
          </WriteContainer>
          <ContentContainer>
            <DataContainer>
              <ReviewDataContainer>
                <Image src={nowBook.thumbnail} title={nowBook.title} />
              </ReviewDataContainer>
              <PageContainer>
                <SubTitle>?????????</SubTitle>
                <PagesContainer>
                  {reviewList.length > 0
                    ? reviewList.map((review, idx) => (
                        <Page onClick={() => handleView(review, idx)}>
                          {review.page}
                        </Page>
                      ))
                    : '????????? ????????????.'}
                </PagesContainer>
              </PageContainer>
            </DataContainer>
            <ReviewContents>
              <SubTitle>
                {!!selectedPage ? selectedPage.page : '???????????? ??????????????????'}
              </SubTitle>
              <SelectContainer>
                <ReviewDate
                  onChange={(option) => {
                    handleChange(option);
                  }}
                >
                  <option>????????? ??????????????????</option>
                  {!!selectedPage
                    ? selectedPage.reviews.map((review, idx) => {
                        return (
                          <option value={idx}>
                            {review.created_at.slice(0, 10)}
                          </option>
                        );
                      })
                    : ''}
                </ReviewDate>
              </SelectContainer>
              <ReviewContent>
                {Object.values(nowReview).length > 0 ? (
                  <ReviewMain>
                    <ReviewText>{nowReview.review}</ReviewText>
                    <BtnContainer>
                      <DelBtn onClick={handleDel}>??????</DelBtn>
                      <EditBtn onClick={handleEdit}>??????</EditBtn>
                    </BtnContainer>
                  </ReviewMain>
                ) : null}
              </ReviewContent>
            </ReviewContents>
          </ContentContainer>
          {/* <ReviewListPageContainer>
            <ReviewThumbnail>
              <img
                width="100%"
                height="100%"
                src={
                  reviewList.book_data ? reviewList.book_data.thumbnail : null
                }
              />
            </ReviewThumbnail>
            <Reviewtitles>
              <ReviewTitleList
                reviewList={reviewList}
                handleCurrentReviews={handleCurrentReviews}
              />
            </Reviewtitles>
          </ReviewListPageContainer>
          <div className="review-createdat">
            <ReviewList
              currentReviews={currentReviews}
              reviewList={reviewList}
            />
          </div> */}
          <div className="alert-box">{errorMessage}</div>
        </Container>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">????????? ??? ??????????????????.</div>
          <button onClick={() => navigate('/')} className="btn">
            ????????? ???????????? ??????
          </button>
        </BeforeLoginModal>
      )}
    </>
  );
};

export default ReviewListPage;
