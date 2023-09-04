import { useState, useEffect } from "react";
import { styled } from "styled-components";

//더미데이터
import imgUrl from "../assets/images/memberImg.jpeg";
import { postList } from "../data/dummy";
const dummyPosts = postList.posts;
const localUser = {
  memberId: 1,
};
localStorage.setItem("memberId", localUser.memberId);

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);

  //화면 첫 랜딩 시 posts를 불러오는 로직
  useEffect(() => {
    setPosts(dummyPosts);
  }, [posts]);

  return (
    <>
      <CommunityBody>
        <CommunityContainer>
          <CardUl>
            {posts.map((post) => (
              <>
                <CardComponent post={post} />
              </>
            ))}
          </CardUl>
        </CommunityContainer>
      </CommunityBody>
    </>
  );
}

const CommunityBody = styled.body`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommunityContainer = styled.div`
  width: 430px;
  height: 100%;

  background-color: #ececec;

  padding-top: 120px;
  padding-bottom: 95px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;

  overflow: scroll;
`;

const CardUl = styled.ul``;

function CardComponent({ post }) {
  const {
    memberId,
    nickname,
    createdAt,
    todoList,
    content,
    like,
    likes,
    comments,
  } = post;
  return (
    <>
      <CardContainer>
        <PostUserComponent
          memberId={memberId}
          nickname={nickname}
          createdAt={createdAt}
        />
        <TodoSection>
          <TodoUl>
            {todoList.map((todo, idx) => (
              <TodoComponent key={idx} todo={todo} />
            ))}
          </TodoUl>
        </TodoSection>
        <PostContentsComponent content={content} like={like} likes={likes} />
        <CommentsComponent comments={comments} />
      </CardContainer>
    </>
  );
}
const CardContainer = styled.li`
  width: 390px;

  background-color: #ffffff;

  margin-bottom: 15px;
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-contents: center;
`;
const TodoSection = styled.section`
  width: 360px;
  height: 200px;

  border-top: 1px solid #d0d0d0;
  border-bottom: 1px solid #d0d0d0;

  overflow: scroll;
`;
const TodoUl = styled.ul``;

function PostUserComponent({ memberId, nickname, createdAt }) {
  return (
    <>
      <UserSection>
        <UserImgDiv>
          <img src={imgUrl} alt={nickname} />
        </UserImgDiv>
        <PostElement>
          <UserName>{nickname}</UserName>
          <PostCreatedAt>{createdAt}</PostCreatedAt>
        </PostElement>
        {Number(memberId) === Number(localStorage.memberId) && (
          <PostButtons>
            <PostButton>수정</PostButton>
            <PostButton>삭제</PostButton>
          </PostButtons>
        )}
      </UserSection>
    </>
  );
}
const UserSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;
const UserImgDiv = styled.div`
  width: 50px;
  height: 50px;

  margin: 5px;
  border: 1px solid #000000;
  border-radius: 50%;

  overflow: hidden;
`;
const PostElement = styled.div`
  width: 250px;
  height: 50px;

  padding-top: 5px;
  padding-left: 5px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
const PostCreatedAt = styled.div`
  font-size: 0.8rem;
`;
const PostButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;
const PostButton = styled.button`
  width: 50px;
  height: 25px;

  color: #949597;

  border-radius: 15px;

  &:hover {
    background-color: #ececec;
  }
`;

function TodoComponent({ todo }) {
  const { title, tag, emoji, complete } = todo;
  return (
    <>
      <TodoContainer>
        <Tag>{tag}</Tag>
        <Title>{title}</Title>
        <EmojiDiv>{complete && <>{emoji}</>}</EmojiDiv>
      </TodoContainer>
    </>
  );
}
const TodoContainer = styled.div`
  margin: 10px 5px;
  padding: 10px 15px;
  border: 1px solid #ffe866;
  border-radius: 15px;

  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;
const Tag = styled.div`
  width: 60px;

  font-size: 0.85rem;

  background-color: #ececec;

  padding: 5px 10px;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  width: 70%;
  height: 25px;

  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: start;
`;
const EmojiDiv = styled.div`
  width: 25px;
  height: 25px;

  border: 1px solid #ececec;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

function PostContentsComponent({ content, like, likes }) {
  return (
    <>
      <ContentsContainer>
        <LikeSection>
          <LikeButton>{like ? "♥" : "♡"}</LikeButton>
          <LikeCount>{likes}</LikeCount>
          <ScrapButton>가져오기</ScrapButton>
        </LikeSection>
        <TextDiv>{content}</TextDiv>
      </ContentsContainer>
    </>
  );
}
const ContentsContainer = styled.div`
  width: 100%;

  padding: 5px 10px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;
const LikeSection = styled.section`
  width: 100%;

  margin: 5px 0px;

  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;
const LikeButton = styled.button`
  width: 25px;
  height: 30px;

  font-size: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const LikeCount = styled.span`
  width: 75%;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: start;
`;
const ScrapButton = styled.button`
  width: 60px;
  height: 30px;

  font-size: 0.75rem;

  background-color: #ffe866;
  &:hover {
    background-color: #ffd900;
  }

  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextDiv = styled.div`
  margin: 5px;
`;

function CommentsComponent({ comments }) {
  const [more, setMore] = useState(true);

  const ChangeMore = () => {
    try {
      setMore(!more);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CommentContainer>
        <CommentCreateComponent />
        <CommentsUl more={more}>
          {comments.map((comment, idx) => (
            <CommentComponent key={idx} comment={comment} />
          ))}
        </CommentsUl>
        <MoreCommentButton onClick={() => ChangeMore()}>
          {more ? "··· More Comment ···" : "··· Close Comment ···"}
        </MoreCommentButton>
      </CommentContainer>
    </>
  );
}
const CommentContainer = styled.div`
  width: 100%;

  margin: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const CommentsUl = styled.ul`
  width: 100%;
  max-height: ${(props) => (props.more ? "80px" : "")};

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;
const MoreCommentButton = styled.button`
  width: 95%;

  font-size: 0.65rem;
  color: #949597;

  margin: 5px 0px 0px -20px;

  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;

function CommentCreateComponent() {
  return (
    <>
      <CreateSection>
        <Label for="CommentInput">ㅇ</Label>
        <Input
          id="CommentInput"
          placeholder="여기에 댓글을 입력해주세요."
        ></Input>
        <CreateButton>등록</CreateButton>
      </CreateSection>
    </>
  );
}
const CreateSection = styled.section`
  width: 90%;

  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Label = styled.label`
  width: 20px;
  height: 20px;
`;
const Input = styled.input`
  width: 220px;
  height: 30px;

  margin: 0px 15px;
  border-bottom: 1px solid #d0d0d0;
`;
const CreateButton = styled.button`
  font-size: 0.75rem;

  background-color: #ececec;
  &:hover {
    background-color: #d0d0d0;
  }

  padding: 5px 15px;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

function CommentComponent({ comment }) {
  const { memberId, nickname, content, createdAt } = comment;
  return (
    <>
      <CommentLi>
        <CommentUserName>{nickname}</CommentUserName>
        <Content>{content}</Content>
        <CreatedAt>{createdAt}</CreatedAt>
        {Number(memberId) === Number(localStorage.memberId) && (
          <ModalButton>···</ModalButton>
        )}
      </CommentLi>
    </>
  );
}
const CommentLi = styled.li`
  margin: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const CommentUserName = styled.div`
  width: 50px;

  font-size: 0.9rem;
  font-weight: bold;

  margin-right: 7px;
`;
const Content = styled.div`
  width: 190px;
  font-size: 0.9rem;
`;
const CreatedAt = styled.div`
  width: 60px;

  font-size: 0.7rem;
  color: #949597;
`;
const ModalButton = styled.button`
  font-size: 0.7rem;
  color: #949597;

  margin-left: 5px;
  padding: 5px;
  border: 1px solid #ececec;
  border-radius: 15px;

  &:hover {
    background-color: #ececec;
  }
`;
