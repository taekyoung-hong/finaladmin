"use client";
import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk"; // 카카오 지도 SDK
import adcommons from "../styles/adcommons.module.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import axios from "axios";

const KakaoMapComponent = () => {
    const [state, setState] = useState({
        center: { lat: 37.49676871972202, lng: 127.02474726969814 }, // 초기 지도 좌표
        isPanto: true, // 부드러운 이동 여부
    });

    const [formData, setFormData] = useState({
        box_name: "", // 약국 이름
        box_address: "", // 주소
    });

    const router = useRouter();

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=933487853729474a473e38bfd47ce1f5&libraries=services"; // YOUR_APP_KEY
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                console.log("Kakao Maps API loaded");
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // 주소 입력 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // name 속성 기반으로 업데이트
        }));
    };

    // 주소 검색 후 지도 이동
    const SearchMap = () => {
        if (!formData.box_address) {
            alert("주소를 입력해주세요.");
            return;
        }

        const ps = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성

        const placesSearchCB = (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const newSearch = data[0]; // 첫 번째 검색 결과 사용
                setState({
                    center: { lat: parseFloat(newSearch.y), lng: parseFloat(newSearch.x) }, // 지도 중심 변경
                    isPanto: true,
                });
            } else {
                alert("검색 결과가 없습니다.");
            }
        };

        ps.keywordSearch(formData.box_address, placesSearchCB); // 키워드로 장소 검색
    };

    // 저장 처리
    const handleSubmit = async () => {
        if (!formData.box_name || !formData.box_address) {
            alert("약국 이름과 주소를 입력해주세요.");
            return;
        }

        try {
            const data = {
                box_name: formData.box_name,
                box_address: formData.box_address,
                box_long: state.center.lng,
                box_lat: state.center.lat,
            };

            console.log("Submitting data:", data);  // 데이터 콘솔에 출력

            // axios POST 요청
            axios.post("http://localhost:8080/api/box_info/write", data, {
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
                            box_name: "",
                            box_address: "",
                        });
                        setState({
                            center: { lat: 37.49676871972202, lng: 127.02474726969814 },
                            isPanto: true,
                        });
                    }
                })
                .catch(error => {
                    console.error("Error response:", error);
                    alert("저장 중 오류가 발생했습니다.");
                });

        } catch (error) {
            console.error("Error saving boxmacy:", error);
            alert("저장 중 오류가 발생했습니다.");
        }
    };
    const handleClickCancel = () => {
        router.push("/ad601"); // 취소 버튼 동작
    };

    return (
        <>
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
                                id="box_name"
                                name="box_name" // `name` 추가
                                value={formData.box_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* 주소 검색 */}
                    <div className={adcommons.adcommons__sub1_container_box}>
                        <div className={adcommons.adcommons__sub1_title}>주소 검색</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                fullWidth
                                label="주소를 입력해주세요"
                                id="box_address"
                                name="box_address" // `name` 추가
                                value={formData.box_address}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <GridSearchIcon
                                                sx={{ cursor: "pointer" }}
                                                onClick={SearchMap}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>

                    {/* 지도 표시 */}
                    <div className={adcommons.adcommons__sub1_content_textarea}>
                        <div className={adcommons.adcommons__sub1_content}>지도</div>
                        <div className={adcommons.adcommons__box}>
                            <Map
                                center={state.center}
                                isPanto={state.isPanto}
                                style={{
                                    width: "100%",
                                    height: "450px",
                                }}
                                level={3} // 지도 확대 레벨
                            >
                                <MapMarker position={state.center} />
                            </Map>
                        </div>
                    </div>

                    {/* 버튼 */}
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
        </>
    );
};

export default KakaoMapComponent;
