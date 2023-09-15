import { styled } from "styled-components";
// import { useState } from "react";

import DirectoryDetailTitle from "../components/DirectoryDetailTitle";
import DirectoryDetailTodoGroup from "../components/DirectoryDetailTodoGroup";

const DirectoryDetailPage = () => {
  //dummy
  const category = "수영";
  const savedTodoGroup = [
    {
      savedTodoId: 2,
      content: "스쿼트 30회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 3,
      content: "랫 풀 다운 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 4,
      content: "데드리프트 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 2,
      content: "스쿼트 30회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 3,
      content: "랫 풀 다운 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 4,
      content: "데드리프트 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 2,
      content: "스쿼트 30회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 3,
      content: "랫 풀 다운 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 4,
      content: "데드리프트 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 2,
      content: "스쿼트 30회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 3,
      content: "랫 풀 다운 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 4,
      content: "데드리프트 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 2,
      content: "스쿼트 30회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 3,
      content: "랫 풀 다운 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
    {
      savedTodoId: 4,
      content: "데드리프트 10회",
      emoji: "🥳",
      tagResponse: {
        tagId: 1,
        tagName: "헬스",
      },
      memberId: 1,
    },
  ];

  return (
    <>
      <DirectoryWrapper>
        <DirectorySection>
          <DirectoryDetailTitle category={category} />
          <DirectoryDetailTodoGroup savedTodoGroup={savedTodoGroup} />
        </DirectorySection>
      </DirectoryWrapper>
    </>
  );
};

export default DirectoryDetailPage;

const DirectoryWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DirectorySection = styled.section`
  width: 100vw;
  max-width: 430px;
  height: 100%;

  background-color: #ffffff;

  padding-top: 95px;

  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: over;
`;
