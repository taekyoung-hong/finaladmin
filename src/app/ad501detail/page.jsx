"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Button, TextField } from '@mui/material';
import adcommons from "../styles/adcommons.module.css";
import { useRouter } from 'next/navigation';

const DetailPage = () => {
    // URL에서 phar_idx를 가져옵니다.
    const searchParams = useSearchParams(); // URL에서 phar_idx를 추출
    const phar_idx = searchParams.get("phar_idx");  // router 객체를 가져옵니다.
    console.log("현재 phar_idx:", phar_idx);  // 콘솔에 출력하여 값 확인

    const [pharmacy, setPharmacy] = useState({
        phar_name: '',
        phar_address: '',
        phar_lat: 0,
        phar_long: 0,
    });

    const [state, setState] = useState({
        center: { lat: 37.49676871972202, lng: 127.02474726969814 },
        isPanto: true,
    });

    useEffect(() => {
        if (phar_idx) {
            const fetchData = async () => {
                try {
                    // API 호출하여 약국 정보 가져오기
                    const response = await axios.get(`http://localhost:8080/api/phar_info/detail/${phar_idx}`);
                    const { data } = response.data; // { data: { phar_name, phar_address, phar_lat, phar_long } }

                    // 데이터 확인
                    console.log("Fetched Data:", data);

                    // 상태 업데이트
                    setPharmacy({
                        phar_name: data.phar_name || '',
                        phar_address: data.phar_address || '',
                        phar_lat: parseFloat(data.phar_lat) || 37.49676871972202,
                        phar_long: parseFloat(data.phar_long) || 127.02474726969814,
                    });

                    setState({
                        center: {
                            lat: parseFloat(data.phar_lat) || 37.49676871972202,
                            lng: parseFloat(data.phar_long) || 127.02474726969814,
                        },
                        isPanto: true,
                    });
                } catch (error) {
                    console.error("Error fetching pharmacy details:", error);
                    alert("약국 정보를 불러오는 데 실패했습니다.");
                }
            };

            fetchData();
        }
    }, [phar_idx]); // phar_idx가 바뀔 때마다 데이터 새로 가져오기

    const handleSave = async () => {
        try {
            const data = {
                phar_idx: phar_idx,
                phar_name: pharmacy.phar_name,
                phar_address: pharmacy.phar_address,
                phar_long: state.center.lng,
                phar_lat: state.center.lat,
            };

            console.log("Submitting data:", data);  // 데이터 콘솔에 출력

            // axios POST 요청
            axios.post("http://localhost:8080/api/phar_info/update", data, {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPharmacy(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const router = useRouter();
    const handleClickCancel = (e) => {
        router.push(`/ad601`);
    }

    return (
        <div className={adcommons.adcommons__main_background_color}>
            <div className={adcommons.adcommons__main_container}>
                <p className={adcommons.adcommons__main_name}>약국 상세보기</p>

                <div className={adcommons.adcommons__main_container_box}>
                    <div className={adcommons.adcommons__main_title}>약국 이름</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="약국 이름"
                            id="phar_name"
                            name="phar_name"
                            value={pharmacy.phar_name || ''}  // 값이 없으면 빈 문자열로 처리
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={adcommons.adcommons__sub1_container_box}>
                    <div className={adcommons.adcommons__sub1_title}>주소</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="주소"
                            id="phar_address"
                            name="phar_address"
                            value={pharmacy.phar_address || ''}  // 값이 없으면 빈 문자열로 처리
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={adcommons.adcommons__sub1_content_textarea}>
                    <div className={adcommons.adcommons__sub1_content}>지도</div>
                    <Map
                        center={state.center}
                        isPanto={state.isPanto}
                        style={{ width: "100%", height: "450px" }}
                        level={3}
                    >
                        <MapMarker position={state.center} />
                    </Map>
                </div>

                <div className={adcommons.adcommons__button_box}>

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
                        onClick={handleSave}
                    >
                        수정
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
                        onClick={handleClickCancel}
                    >
                        취소
                    </Button>
                </div>
            </div>
        </div>
    );

}
export default DetailPage;
