"use client";
import React, { useState } from "react";
import styles from "../styles/ad301detail.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Page(props) {
  // 각 파일에 대한 상태를 별도로 관리
  const [fileName1, setFileName1] = useState("");
  // 파일 선택 시 상태 업데이트 함수
  const handleFileChange = (event, setFileName) => {
    const file = event.target.files[0]; // 첫 번째 파일 선택
    if (file) {
      setFileName(file.name); // 파일 이름을 상태에 저장
    }
  };
  const [authority, setAuthority] = React.useState('');

  const handleChange = (e) => {
    setAuthority(e.target.value);
  };

  return (
    <>
      <div className={styles.ad301detail__main_background_color}>
        <div className={styles.ad301detail__main_container}>
          <p className={styles.ad301detail__main_name}>관리자 상세보기</p>
          <div className={styles.ad301detail__main_cotainer_box}>
            <div className={styles.ad301detail__main_title}>아이디</div>
            <div className={styles.ad301detail__box}>
              <TextField fullWidth label="닉네임" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad301detail__sub1_cotainer_box}>
            <div className={styles.ad301detail__sub1_title}>이름</div>
            <div className={styles.ad301detail__box}>
              <TextField fullWidth label="이름" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad301detail__sub1_cotainer_box}>
            <div className={styles.ad301detail__sub1_title}>이메일</div>
            <div className={styles.ad301detail__box}>
              <TextField fullWidth label="이메일" id="fullWidth" />
            </div>
          </div>

          {/* 페이지 권한이 부여된 항목 표시 select */}
          <div className={styles.ad301detail__sub1_cotainer_box}>
            <div className={styles.ad301detail__sub1_title}>권한</div>
            <div className={styles.ad301detail__box}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  authority</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={authority}
                  onChange={handleChange}
                  label="권한"
                >
                  <MenuItem value="">
                    <em>없음</em>
                  </MenuItem>
                  <MenuItem value={10}>회원</MenuItem>
                  <MenuItem value={20}>페이지</MenuItem>
                  <MenuItem value={30}>커뮤니티</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className={styles.ad301detail__sub1_content_textarea}>
            <div className={styles.ad301detail__sub1_content}>이미지</div>
            <div className={styles.ad301detail__box}>
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
          <div className={styles.ad301detail__sub2_cotainer_box}>
            <div className={styles.ad301detail__sub2_title}>첨부파일1</div>
            <div className={styles.ad301detail__box}>
              <div className={styles.ad301detail__filebox}>
                <input
                  className={styles.ad301detail__uploadName}
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


          <div className={styles.ad301detail__button_box}>
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
