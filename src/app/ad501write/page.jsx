"use client";
import React, { useState } from "react";
import styles from "../styles/ad403.module.css";
import adcommons from "../styles/adcommons.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios"; // axios 추가

function Page(props) {
  const [fileName1, setFileName1] = useState("");

  const [formData, setFormData] = useState({
    item_name: "",
    entp_name: "",
    item_seq: "",
    chart: "",
    item_image: "",
    drug_shape: "",
    class_name: "",
    etc_otc_name: ""
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 첫 번째 파일 선택
    if (file) {
      setFormData({
        ...formData,
        file: file,  // 선택된 파일을 상태에 저장
        notice_file_name: file.name // 파일 이름 저장
      });
      setFileName1(file.name);  // 파일 이름 상태 업데이트
    }
  };

  const handleSubmit = async () => {
    try {
      // FormData 객체 생성
      const data = new FormData();
      data.append("item_name", formData.item_name);
      data.append("entp_name", formData.entp_name);
      data.append("item_seq", formData.item_seq); // 파일 추가
      data.append("chart", formData.chart);
      data.append("item_image", formData.item_image);
      data.append("drug_shape", formData.drug_shape);
      data.append("class_name", formData.class_name);
      data.append("etc_otc_name", formData.etc_otc_name);




      // axios POST 요청
      axios.post("http://localhost:8080/api/drug_info/write", data, {
        headers: {
          "Content-Type": "multipart/form-data",  // multipart/form-data로 요청 헤더 설정
        },
      })
        .then(response => {
          console.log("Response status:", response.status);  // 상태 코드 확인
          if (response.status === 200 || response.status === 201) {
            console.log("Response data:", response.data);
            alert("저장되었습니다.");
            setFormData({ // 상태 초기화
              item_name: "",
              entp_name: "",
              item_seq: "",
              chart: "",
              item_image: "",
              drug_shape: "",
              class_name: "",
              etc_otc_name: ""

            });
            setFileName1(""); // 파일 이름 초기화
          }
        })
        .catch(error => {
          console.error("Error response:", error);
          alert("저장 중 오류가 발생했습니다.");
        });

    } catch (error) {
      console.error("Error saving drug_info:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={adcommons.adcommons__main_background_color}>
        <div className={adcommons.adcommons__main_container}>
          <p className={adcommons.adcommons__main_name}>의약품 추가하기</p>
          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>약품명</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="약품명" id="fullWidth"
                onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_content_textarea}>
            <div className={adcommons.adcommons__sub1_content}>업소명</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                id="outlined-multiline-flexible"
                label="업소명"
                multiline
              
                fullWidth
                onChange={(e) => setFormData({ ...formData, entp_name: e.target.value })}
              />
            </div>
          </div>
          <div className={adcommons.adcommons__sub1_content_textarea}>
            <div className={adcommons.adcommons__sub1_content}>제품 일련번호</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                id="outlined-multiline-flexible"
                label="제품 일련번호"
                multiline
               
                fullWidth
                onChange={(e) => setFormData({ ...formData, item_seq: e.target.value })}
              />
            </div>
          </div>
          <div className={adcommons.adcommons__sub1_content_textarea}>
            <div className={adcommons.adcommons__sub1_content}>제품 묘사</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                id="outlined-multiline-flexible"
                label="제품 묘사"
                multiline
                
                fullWidth
                onChange={(e) => setFormData({ ...formData, chart: e.target.value })}
              />
            </div>
          </div>
          <div className={adcommons.adcommons__sub1_content_textarea}>
            <div className={adcommons.adcommons__sub1_content}>제품 모양</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                id="outlined-multiline-flexible"
                label="제품 모양"
                multiline
               
                fullWidth
                onChange={(e) => setFormData({ ...formData, drug_shape: e.target.value })}
              />
            </div>
          </div>
          <div className={adcommons.adcommons__sub1_content_textarea}>
            <div className={adcommons.adcommons__sub1_content}>작용범위</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                id="outlined-multiline-flexible"
                label="작용범위"
                multiline
                maxRows={5}
                rows={5}
                fullWidth
                onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
              />
            </div>
          </div>
          <div className={adcommons.adcommons__sub1_content_textarea}>
            <div className={adcommons.adcommons__sub1_content}>급여여부</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                id="outlined-multiline-flexible"
                label="급여여부"
                multiline
                maxRows={5}
                rows={5}
                fullWidth
                onChange={(e) => setFormData({ ...formData, etc_otc_name: e.target.value })}
              />
            </div>
          </div>
     

          {/* 파일 1 */}
          <div className={adcommons.adcommons__sub2_container_box}>
            <div className={adcommons.adcommons__sub2_title}>제품사진</div>
            <div className={adcommons.adcommons__box}>
              <div className={adcommons.adcommons__filebox}>
                <input
                  className={adcommons.adcommons__uploadName}
                  value={fileName1}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file1">파일찾기</label>
               
              </div>
            </div>
          </div>

          <div className={adcommons.adcommons__button_box}>
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
              onClick={handleSubmit}
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
