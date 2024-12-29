"use client";
import React, { useState, useEffect } from "react"; // React와 useState, useEffect 임포트
import { Map, MapMarker } from "react-kakao-maps-sdk"; // 카카오 지도 SDK 관련 라이브러리 임포트 필요
import adcommons from "../styles/adcommons.module.css"
import { Button, InputAdornment, TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";

const KakaoMapComponent = () => {
   
    

    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.49676871972202, lng: 127.02474726969814 },
        isPanto: true, // 부드러운 이동 여부
    });
    const [searchAddress, setSearchAddress] = useState(""); // 입력된 주소 키워드
    const [searchAddress2, setSearchAddress2] = useState(""); // 입력된 주소 키워드2

    // 카카오 지도 API 스크립트 로드
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=933487853729474a473e38bfd47ce1f5&libraries=services"; // YOUR_APP_KEY를 실제 키로 변경
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                console.log("Kakao Maps API loaded");
            });
        };

        return () => {
            document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
        };
    }, []);

    // 입력된 값 처리
    const handleSearchAddress = (e) => {
        setSearchAddress(e.target.value);
    };
    const handleSearchAddress2 = (e) => {
        setSearchAddress2(e.target.value);
    };

    const [pharName, setPharName] = useState('');

    const handlePharName = (e) => {
        setPharName(e.target.value);
    }

    // 키워드 검색 후 지도 이동
    const SearchMap = () => {
        const ps = new window.kakao.maps.services.Places(); // 카카오 장소 검색 서비스 객체 생성

        const placesSearchCB = (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const newSearch = data[0]; // 검색 결과의 첫 번째 데이터 사용
                setState({
                    center: { lat: parseFloat(newSearch.y), lng: parseFloat(newSearch.x) }, // 지도 중심 좌표 업데이트
                    isPanto: true,
                });
            } else {
                alert("검색 결과가 없습니다."); // 검색 실패 시 메시지
            }
        };

        ps.keywordSearch(searchAddress, placesSearchCB); // 키워드 검색 실행
        ps.keywordSearch(searchAddress2, placesSearchCB); // 키워드 검색 실행
    };

    return (
        <>
            <div className={adcommons.adcommons__main_background_color}>
                <div className={adcommons.adcommons__main_container}>
                    <p className={adcommons.adcommons__main_name}>약국 등록하기</p>
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>약국 이름</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField 
                            fullWidth label="약국 이름" 
                            id="fullWidth" 
                            value={pharName}
                            onChange={handlePharName}
                            />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub1_container_box}>
                        <div className={adcommons.adcommons__sub1_title}>지번으로 검색</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                fullWidth
                                label="지번으로 검색"
                                id="fullWidth"
                                value={searchAddress} // 입력된 값과 상태 연결
                                onChange={handleSearchAddress} // 입력 변경 시 상태 업데이트
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

                    <div className={adcommons.adcommons__sub1_container_box}>
                        <div className={adcommons.adcommons__sub1_title}>도로명으로 검색</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                fullWidth
                                label="도로명으로 검색"
                                id="fullWidth"
                                value={searchAddress2} // 입력된 값과 상태 연결
                                onChange={handleSearchAddress2} // 입력 변경 시 상태 업데이트
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

                    <div className={adcommons.adcommons__sub1_content_textarea}>
                        <div className={adcommons.adcommons__sub1_content}>지도</div>
                        <div className={adcommons.adcommons__box}>
                            {/* 지도 컨테이너 */}
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
};

export default KakaoMapComponent;
