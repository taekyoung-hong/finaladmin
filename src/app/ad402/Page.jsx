"use client";
import React, { useState } from "react";
import styles from "../styles/ad402.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Page(props) {
  // 각 파일에 대한 상태를 별도로 관리
  const [fileName1, setFileName1] = useState(""); 
  const [fileName2, setFileName2] = useState("");
  const [fileName3, setFileName3] = useState("");

  // 파일 선택 시 상태 업데이트 함수
  const handleFileChange = (event, setFileName) => {
    const file = event.target.files[0]; // 첫 번째 파일 선택
    if (file) {
      setFileName(file.name); // 파일 이름을 상태에 저장
    }
  };

  return (
    <>
      <div className={styles.ad402__main_background_color}>
        <div className={styles.ad402__main_container}>
          <p className={styles.ad402__main_name}>의약품의 종류</p>
          <div className={styles.ad402__main_cotainer_box}>
            <div className={styles.ad402__main_title}>메인 타이틀</div>
            <div className={styles.ad402__box}>
              <TextField fullWidth label="메인 타이틀" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad402__sub1_cotainer_box}>
            <div className={styles.ad402__sub1_title}>서브1 타이틀</div>
            <div className={styles.ad402__box}>
              <TextField fullWidth label="서브1 타이틀" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad402__sub1_content_textarea}>
            <div className={styles.ad402__sub1_content}>내용</div>
            <div className={styles.ad402__box}>
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
          <div className={styles.ad402__sub2_cotainer_box}>
            <div className={styles.ad402__sub2_title}>첨부파일1</div>
            <div className={styles.ad402__box}>
              <div className={styles.ad402__filebox}>
                <input
                  className={styles.ad402__uploadName}
                  value={fileName1}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file1">파일찾기</label>
                <input
                  type="file"
                  id="file1"
                  name="file_name1"
                  onChange={(e) => handleFileChange(e, setFileName1)} // 파일1 상태 업데이트
                />
              </div>
            </div>
          </div>

          {/* 파일 2 */}
          <div className={styles.ad402__sub2_cotainer_box}>
            <div className={styles.ad402__sub2_title}>첨부파일2</div>
            <div className={styles.ad402__box}>
              <div className={styles.ad402__filebox}>
                <input
                  className={styles.ad402__uploadName}
                  value={fileName2}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file2">파일찾기</label>
                <input
                  type="file"
                  id="file2"
                  name="file_name2"
                  onChange={(e) => handleFileChange(e, setFileName2)} // 파일2 상태 업데이트
                />
              </div>
            </div>
          </div>

          {/* 파일 3 */}
          <div className={styles.ad402__sub2_cotainer_box}>
            <div className={styles.ad402__sub2_title}>첨부파일3</div>
            <div className={styles.ad402__box}>
              <div className={styles.ad402__filebox}>
                <input
                  className={styles.ad402__uploadName}
                  value={fileName3}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file3">파일찾기</label>
                <input
                  type="file"
                  id="file3"
                  name="file_name3"
                  onChange={(e) => handleFileChange(e, setFileName3)} // 파일3 상태 업데이트
                />
              </div>
            </div>
          </div>

          <div className={styles.ad402__button_box}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: "white",
                color: "#9e9e9e",
                border: "1px solid #9e9e9e",
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
                marginLeft: "15px",
                backgroundColor: "white",
                color: "#9e9e9e",
                border: "1px solid #9e9e9e",
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
