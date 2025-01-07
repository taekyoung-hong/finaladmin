'use client';

import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk"; // 카카오 지도 SDK
import { Button, InputAdornment, TextField } from "@mui/material"; // Material UI
import { GridSearchIcon } from "@mui/x-data-grid"; // 검색 아이콘
import axios from "axios";
import { useRouter } from "next/router"; // URL에서 id 가져오기
import adcommons from "../styles/adcommons.module.css";

const KakaoMapComponent = () => {
    const router = useRouter();
    const { id } = router.query; // id를 동적으로 가져오기

    const [state, setState] = useState({
        center: { lat: 37.49676871972202, lng: 127.02474726969814 },
        isPanto: true,
    });
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchAddress, setSearchAddress] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return; // id가 없으면 실행하지 않음
            try {
                setLoading(true);
                const API_URL = `http://localhost:8080/api/phar_info/detail/${id}`; // URL 문자열 템플릿
                const response = await axios.get(API_URL);
                const data = response.data;
                if (data.success) {
                    setItem(data.data);
                } else {
                    setError("데이터 연결 실패");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("데이터를 가져오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const SearchMap = () => {
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(searchAddress, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const newSearch = data[0];
                setState({
                    center: { lat: parseFloat(newSearch.y), lng: parseFloat(newSearch.x) },
                    isPanto: true,
                });
            } else {
                alert("검색 결과가 없습니다.");
            }
        });
    };



    return (
        <div className={adcommons.adcommons__main_background_color}>
            <div className={adcommons.adcommons__main_container}>
                <p className={adcommons.adcommons__main_name}>약국 등록하기</p>

                {/* 약국 이름 입력 */}
                <div className={adcommons.adcommons__main_container_box}>
                    <div className={adcommons.adcommons__main_title}>약국 이름</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="약국 이름"
                            value={item?.phar_Name || ""}
                            onChange={(e) => setItem({ ...item, phar_Name: e.target.value })}
                        />
                    </div>
                </div>

                {/* 주소 검색 */}
                <div className={adcommons.adcommons__sub1_container_box}>
                    <div className={adcommons.adcommons__sub1_title}>주소 검색</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="주소를 입력하세요"
                            value={searchAddress}
                            onChange={(e) => setSearchAddress(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <GridSearchIcon sx={{ cursor: "pointer" }} onClick={SearchMap} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>

                {/* 지도 */}
                <div className={adcommons.adcommons__sub1_content_textarea}>
                    <div className={adcommons.adcommons__sub1_content}>지도</div>
                    <div className={adcommons.adcommons__box}>
                        <Map
                            center={state.center}
                            isPanto={state.isPanto}
                            style={{ width: "100%", height: "450px" }}
                            level={3}
                        >
                            <MapMarker position={state.center} />
                        </Map>
                    </div>
                </div>

                {/* 버튼들 */}
                <div className={adcommons.adcommons__button_box}>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={handleSubmit}
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
                        onClick={handleClickCancel}
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

export default KakaoMapComponent;
