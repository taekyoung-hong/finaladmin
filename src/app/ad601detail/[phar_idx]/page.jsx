"use client";
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Button, TextField } from '@mui/material';
import adcommons from "../../styles/adcommons.module.css";

const DetailPage = () => {
    // URL에서 phar_idx를 가져옵니다.
    const { phar_idx } = useParams(); // URL에서 phar_idx를 추출
    const router = useRouter();  // router 객체를 가져옵니다.

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
                    // API를 호출하여 약국 정보를 가져옵니다.
                    const response = await axios.get(`http://localhost:8080/api/phar_info/detail/${phar_idx}`);
                    const data = response.data;
                    console.log("data", data);
                    // 받아온 데이터를 상태에 설정합니다.

                    setPharmacy({
                        phar_name: data.phar_name,
                        phar_address: data.phar_address,
                        phar_lat: parseFloat(data.phar_lat),
                        phar_long: parseFloat(data.phar_long),
                    });

                    setState({
                        center: {
                            lat: parseFloat(data.phar_lat) || 37.49676871972202,
                            lng: parseFloat(data.phar_long) || 127.02474726969814,
                        },
                        isPanto: true,
                    });

                    console.log("phar_idx", phar_idx);  // phar_idx 출력

                } catch (error) {
                    console.error("Error fetching pharmacy details:", error);
                    alert("약국 정보를 불러오는 데 실패했습니다.");
                }
            };

            fetchData();
        }
    }, [phar_idx]);  // phar_idx 값이 변경될 때마다 실행


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPharmacy(prev => ({
            ...prev,
            [name]: value,
        }));
    };

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
                            value={pharmacy.phar_name || ''}  // 오류 방지
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
                            value={pharmacy.phar_address || ''}  // 오류 방지
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
                        // onClick={handleSubmit}
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
                        // onClick={handleClickCancel}
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
    );
};

export default DetailPage;
