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
        notice_title: "",
        notice_content: "",
        notice_reg_date: "",
        file: null,  // 파일 데이터를 저장할 변수로 수정
        notice_file_name: "",
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
            data.append("notice_title", formData.notice_title);
            data.append("notice_content", formData.notice_content);
            data.append("notice_file", formData.file); // 파일 추가
            data.append("notice_file_name", formData.notice_file_name);
            data.append("notice_reg_date", formData.notice_reg_date);

            console.log("notice_title:", formData.notice_title);
            console.log("notice_content:", formData.notice_content);
            console.log("notice_file_name:", formData.notice_file_name);
            console.log("notice_reg_date:", formData.notice_reg_date);
            console.log("notice_reg_date:", formData.file);


            console.log("Submitting data:", data);  // FormData 출력

            // axios POST 요청
            axios.post("http://localhost:8080/api/notice/write", data, {
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
                            notice_title: "",
                            notice_content: "",
                            notice_reg_date: "",
                            notice_file: "",
                            notice_file_name: "",

                        });
                        setFileName1(""); // 파일 이름 초기화
                    }
                })
                .catch(error => {
                    console.error("Error response:", error);
                    alert("저장 중 오류가 발생했습니다.");
                });

        } catch (error) {
            console.error("Error saving pharmacy:", error);
            alert("저장 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <div className={adcommons.adcommons__main_background_color}>
                <div className={adcommons.adcommons__main_container}>
                    <p className={adcommons.adcommons__main_name}>공지사항 작성하기</p>
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>제목</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="메인 타이틀" id="fullWidth"
                                onChange={(e) => setFormData({ ...formData, notice_title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub1_content_textarea}>
                        <div className={adcommons.adcommons__sub1_content}>내용</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline
                                maxRows={10}
                                rows={10}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, notice_content: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* 파일 1 */}
                    <div className={adcommons.adcommons__sub2_container_box}>
                        <div className={adcommons.adcommons__sub2_title}>첨부파일1</div>
                        <div className={adcommons.adcommons__box}>
                            <div className={adcommons.adcommons__filebox}>
                                <input
                                    className={adcommons.adcommons__uploadName}
                                    value={fileName1}
                                    placeholder=""
                                    readOnly
                                />
                                <label htmlFor="file1">파일찾기</label>
                                <input
                                    type="file"
                                    id="file1"
                                    name="file"
                                    onChange={handleFileChange} // 파일 선택 시 상태 업데이트
                                />
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
