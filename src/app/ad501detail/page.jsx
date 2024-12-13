"use client";
import React, { useState } from "react";
import styles from "../styles/ad501detail.module.css";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

function Page(props) {
  // 각 파일에 대한 상태를 별도로 관리
  const [fileName1, setFileName1] = useState("");
  const [filePreview1, setFilePreview1] = useState(null);  // 이미지 미리보기 상태 추가
  const [fileDescription, setFileDescription] = useState(""); // 파일에 대한 텍스트 입력 상태 추가

  // 파일 선택 시 상태 업데이트 함수
  const handleFileChange = (event, setFileName, setFilePreview) => {
    const file = event.target.files[0]; // 첫 번째 파일 선택
    if (file) {
      setFileName(file.name); // 파일 이름을 상태에 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result); // 이미지 미리보기 업데이트
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽어들여 이미지 미리보기
    }
  };

  // 텍스트 입력 처리 함수
  const handleTextChange = (event) => {
    setFileDescription(event.target.value);
  };



  return (
    <>
      <div className={styles.ad501detail__main_background_color}>
        <div className={styles.ad501detail__main_container}>
          <p className={styles.ad501detail__main_name}>안전한 의약생활 - 의약품 상세보기 및 수정하기기</p>
          <div className={styles.ad501detail__main_cotainer_box}>
            <div className={styles.ad501detail__main_title}>약품명</div>
            <div className={styles.ad501detail__box}>
              <TextField fullWidth label="약품명" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad501detail__main_cotainer_box}>
            <div className={styles.ad501detail__main_title}>제조사</div>
            <div className={styles.ad501detail__box}>
              <TextField fullWidth label="제조사명" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad501detail__sub1_cotainer_box}>
            <div className={styles.ad501detail__sub1_title}>약의 효능</div>
            <div className={styles.ad501detail__box}>
              <TextField fullWidth label="내용" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad501detail__sub1_content_textarea}>
            <div className={styles.ad501detail__sub1_content}>부작용</div>
            <div className={styles.ad501detail__box}>
              <TextField
                id="outlined-multiline-flexible"
                label="내용"
                multiline
                maxRows={4}
                rows={4}
                fullWidth
              />
            </div>
          </div>

          {/* 파일 1 */}
          <div className={styles.ad501detail__sub2_cotainer_box}>
            <div className={styles.ad501detail__sub2_title}>첨부파일1</div>
            <div className={styles.ad501detail__box}>
              <div className={styles.ad501detail__filebox}>
                {/* 이미지 미리보기 영역 */}
                <div className={styles.ad501detail__imgbox}>
                  {filePreview1 && (
                    <img src={filePreview1} alt="파일 미리보기" className={styles.ad501detail__imagePreview} />
                  )}
                </div>
               {/*  <div className={styles.ad501detail__description}>
                 <label htmlFor="file1">파일 설명</label>
                <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={1}
                rows={1}
                fullWidth
              />
              </div> */}
                <input
                  className={styles.ad501detail__uploadName}
                  value={fileName1}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file1">파일찾기</label>
                <input
                  type="file"
                  id="file1"
                  name="file_name1"
                  onChange={(e) => handleFileChange(e, setFileName1, setFilePreview1)} // 파일1 상태 업데이트 및 미리보기
                />
              </div>
            </div>
          </div>

          <div className={styles.ad501detail__button_box}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: "white",
                color: "#9C27B0",
                border: "1px solid #9C27B0",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                  border: "1px solid #9e9e9e",
                },
              }}
            >
              저장
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: "white",
                color: "#9C27B0",
                border: "1px solid #9C27B0",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                  border: "1px solid #9e9e9e",
                },
              }}
            >
              삭제
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: "white",
                color: "#9C27B0",
                border: "1px solid #9C27B0",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                  border: "1px solid #9e9e9e",
                },
              }}
            >
              취소
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;