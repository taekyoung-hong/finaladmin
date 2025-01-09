"use client"
import React, { useState } from 'react';
import styles from '../styles/ad401.module.css'
import adcommons from "../styles/adcommons.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function Page(props) {

    const [formData, setFormData] = useState({
        ad401title: "",
        ad401content: "",
        ad401_subtitle1: "",
        ad401_subcontent1: "",
        ad401_subtitle2: "",
        ad401_subcontent2: "",
        ad401_subtitle3: "",
        ad401_subcontent3: ""
    });

    const handleSubmit = async () => {

        try {
            const data = {
                ad401title: formData.ad401title,
                ad401content: formData.ad401content,
                ad401_subtitle1: formData.ad401_subtitle1,
                ad401_subcontent1: formData.ad401_subcontent1,
                ad401_subtitle2: formData.ad401_subtitle2,
                ad401_subcontent2: formData.ad401_subcontent2,
                ad401_subtitle3: formData.ad401_subtitle3,
                ad401_subcontent3: formData.ad401_subcontent3
            };

            console.log("Submitting data:", data);  // 데이터 콘솔에 출력

            // axios POST 요청
            axios.post("http://localhost:8080/api/ad401/write", data, {
                headers: {
                    "Content-Type": "application/json",  // 요청 헤더에 JSON 형식 명시
                },
            })
                .then(response => {
                    console.log("Response status:", response.status);  // 상태 코드 확인
                    if (response.status === 200 || response.status === 201) {
                        console.log("Response data:", response.data);
                        alert("저장되었습니다.");
                        // 상태 초기화
                        setFormData({
                            ad401title: "", // 약국 이름
                            ad401content: "", // 주소
                            ad401_subtitle1: "",
                            ad401_subcontent1: "",
                            ad401_subtitle2: "",
                            ad401_subcontent2: "",
                            ad401_subtitle3: "",
                            ad401_subcontent3: ""
                        });

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
    const handleClickCancel = () => {
        router.push("/ad401"); // 취소 버튼 동작
    };



    return (
        <>

            <div className={adcommons.adcommons__main_background_color}>
                <div className={adcommons.adcommons__main_container}>
                    <p className={adcommons.adcommons__main_name}>의약품 정의</p>
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>메인 타이틀</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="메인 타이틀" id="fullWidth"
                                onChange={(e) => setFormData({ ...formData, ad401title: e.target.value })} />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__main_content_textarea}>
                        <div className={adcommons.adcommons__main_content}>내용</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline
                                maxRows={4}
                                rows={4}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, ad401content: e.target.value })}

                            />
                        </div>
                    </div>


                    <div className={adcommons.adcommons__sub1_container_box}>
                        <div className={adcommons.adcommons__sub1_title}>서브1 타이틀</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="서브1 타이틀" id="fullWidth" 
                            onChange={(e) => setFormData({ ...formData, ad401_subtitle1: e.target.value })}
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
                                maxRows={4}
                                rows={4}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, ad401_subcontent1: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub2_container_box}>
                        <div className={adcommons.adcommons__sub2_title}>서브2 타이틀</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="서브2 타이틀" id="fullWidth"
                                onChange={(e) => setFormData({ ...formData, ad401_subtitle2: e.target.value })}
                            
                            />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub2_content_textarea}>
                        <div className={adcommons.adcommons__sub2_content}>내용</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline
                                maxRows={4}
                                rows={4}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, ad401_subcontent2: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub3_container_box}>
                        <div className={adcommons.adcommons__sub3_title}>서브3 타이틀</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="서브3 타이틀" id="fullWidth"
                             onChange={(e) => setFormData({ ...formData, ad401_subtitle3: e.target.value })}
                           />
                        </div>

                    </div>

                    <div className={adcommons.adcommons__sub3_content_textarea}>
                        <div className={adcommons.adcommons__sub3_content}>내용</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline
                                maxRows={4}
                                rows={4}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, ad401_subcontent2: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={adcommons.adcommons__button_box}>
                        <Button
                            variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
                            size="medium"
                            sx={{
                                backgroundColor: 'white',  // 배경을 흰색으로 설정
                                color: '#9e9e9e',  // 글자 색상 #9e9e9e
                                border: '1px solid #9e9e9e',  // 보더 색상 #9e9e9e
                                '&:hover': {
                                    backgroundColor: 'secondary.main',  // hover 시 배경 색상 (secondary 색상)
                                    color: 'white',  // hover 시 글자 색상 흰색
                                    border: '1px solid #9e9e9e',  // hover 시 보더 색상

                                }
                            }}
                            onClick={handleSubmit}
                        >
                            저장
                        </Button>

                        <Button
                            variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
                            size="medium"
                            sx={{
                                marginLeft: '15px',
                                backgroundColor: 'white',  // 배경을 흰색으로 설정
                                color: '#9e9e9e',  // 글자 색상 #9e9e9e
                                border: '1px solid #9e9e9e',  // 보더 색상 #9e9e9e
                                '&:hover': {
                                    backgroundColor: 'secondary.main',  // hover 시 배경 색상 (secondary 색상)
                                    color: 'white',  // hover 시 글자 색상 흰색
                                    border: '1px solid #9e9e9e',  // hover 시 보더 색상

                                }

                            }}
                            onClick={handleClickCancel}
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