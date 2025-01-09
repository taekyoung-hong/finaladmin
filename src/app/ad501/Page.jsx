"use client";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import adcommons from "../styles/adcommons.module.css";
import styles from "../styles/ad601.module.css";
import axios from "axios";

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
    return (
        <div className={adcommons.adcommons__searchcontainer}>
            <div className={adcommons.adcommons__searchbar}>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>
                    <span className="material-symbols-outlined">search</span>
                </button>
            </div>
        </div>
    );
}

export default function DataTable() {
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [rows, setRows] = useState([]); // 서버에서 가져온 데이터 상태
    const [filteredRows, setFilteredRows] = useState([]); // 필터링된 데이터 상태
    const [page, setPage] = useState(1);
    const [rowSelectionModel, setRowSelectionModel] = useState([]); // 선택된 항목들
    const [loading, setLoading] = useState('')
    const rowsPerPage = 5;
    const router = useRouter();

    const handleDelete = async () => {
        // rowSelectionModel에서 drung_info_idx만 추출
        const selectedIds = Array.isArray(rowSelectionModel) ? rowSelectionModel : [];

        console.log("selectedIds:", selectedIds);

        if (selectedIds.length === 0) {
            alert("삭제할 항목을 선택해 주세요.");
            return;
        }

        try {
            // selectedIds 배열의 각 요소를 순회
            for (const drung_info_idx of selectedIds) {
                console.log("삭제할 약국 ID:", drung_info_idx);

                // DELETE 요청 보내기
                await axios.post(`http://localhost:8080/api/drug_info/delete/${drung_info_idx}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            alert("삭제되었습니다.");
            setRowSelectionModel([]);  // 선택 초기화
            window.location.reload();
        } catch (error) {
            console.error("Error deleting drig:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 데이터를 불러옴
        const fetchData = async () => {
            try {
                // 서버에서 데이터 가져오기
                const response = await axios.get('http://localhost:8080/api/drug_info/list');
                console.log("서버에서 가져온 데이터:", response.data);

                if (response.data && Array.isArray(response.data.data)) {
                    // 데이터를 DataGrid가 요구하는 형식에 맞게 가공
                    const updatedRows = response.data.data.map((row) => ({
                        ...row,  // 기존 데이터는 그대로 유지
                    }));
                    setRows(updatedRows); // 가공된 데이터로 상태 업데이트
                }
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setLoading(false);  // 데이터 로딩 끝났으므로 loading 상태 종료
            }
        };

        fetchData();
    }, []);  // 컴포넌트 마운트 시 한 번만 실행되도록 빈 배열 전달


    useEffect(() => {
        setFilteredRows(rows);
    }, [rows]);

    // 검색어에 맞는 데이터 필터링
    const handleSearch = () => {
        console.log("검색어:", searchQuery);
        const filtered = rows.filter((row) => {
            const itemNameMatch = row.item_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const entpMatch = row.entp_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            if (itemNameMatch || entpMatch) {
                console.log("일치하는 항목:", row);
            }

            return itemNameMatch || entpMatch;
        });

        console.log("필터링된 데이터:", filtered);
        setFilteredRows(filtered);
    };

    const handleRowClick = (params) => {
        const { drung_info_idx } = params.row;
        router.push(`/ad501detail?drung_info_idx=${drung_info_idx}`);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className={adcommons.adcommons__container}>
            <h1 className={adcommons.adcommons__title}>의약품 검색하기</h1>
            <div className={styles.ad601__search}>
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                />
            </div>

            <div
                className={adcommons.adcommons__buttoncontainer}
                style={{ marginTop: "25px" }}
            >
                <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                        backgroundColor: "white",
                        color: "#9C27B0",
                        border: "1px solid #9C27B0",
                        borderRadius: "42px",
                        "&:hover": {
                            backgroundColor: "secondary.main",
                            color: "white",
                            border: "1px solid #9e9e9e",
                        },
                    }}
                    onClick={handleDelete}  // handleDelete 바로 사용
                >
                    삭제하기
                </Button>

                <Link href="/ad501write" passHref>
                    <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                            backgroundColor: "white",
                            color: "#9C27B0",
                            border: "1px solid #9C27B0",
                            borderRadius: "42px",
                            "&:hover": {
                                backgroundColor: "secondary.main",
                                color: "white",
                                border: "1px solid #9e9e9e",
                            },
                        }}
                    >
                        추가하기
                    </Button>
                </Link>
            </div>

            <div className={adcommons.adcommons__table}>
                <DataGrid
                    rows={currentRows}
                    columns={[
                        { field: "drung_info_idx", headerName: "ID", width: 150, align: "center" },
                        { field: "item_name", headerName: "약품명", width: 190, align: "center" },
                        { field: "item_seq", headerName: "제품 일련번호", width: 250, align: "center" },
                        { field: "entp_name", headerName: "업체명", width: 190, align: "center" },
                        { field: "drug_shape", headerName: "약모양", width: 190, align: "center" },
                        { field: "class_name", headerName: "작용범위", width: 300, align: "center" },

                    ]}
                    pageSize={rowsPerPage}
                    checkboxSelection
                    disableSelectionOnClick
                    onRowSelectionModelChange={(newSelectionModel) => {
                        // newSelectionModel에서 drung_info_idx만 추출
                        console.log("새로운 선택된 ID들:", newSelectionModel);  // 확인용 로그
                        setRowSelectionModel(newSelectionModel);  // 새로운 selection model 그대로 사용
                    }}
                    rowSelectionModel={rowSelectionModel}
                    scrollbarSize={0}
                    onRowClick={handleRowClick}
                    getRowId={(row) => row.drung_info_idx}  // 'drung_info_idx'를 ID로 사용
                    hideFooterPagination
                    hideFooter
                    
                />
            </div>

            <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(filteredRows.length / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="secondary"
                />
            </Stack>
        </div>
    );
}
