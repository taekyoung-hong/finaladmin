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
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const rowsPerPage = 5;
  const router = useRouter();



  const handleDelete = async () => {
    // rowSelectionModel에서 phar_idx만 추출
    const selectedIds = Array.isArray(rowSelectionModel) ? rowSelectionModel.map(item => item.phar_idx) : [];
  
    // selectedIds의 값이 무엇인지 콘솔에 출력
    console.log("selectedIds:", selectedIds);
  
    if (selectedIds.length === 0) {
      alert("삭제할 항목을 선택해 주세요.");
      return;
    }
  
    try {
      // selectedIds 배열의 각 요소를 순회
      for (const k in selectedIds) {
        // 배열의 요소를 제대로 접근하기 위해, k는 배열 인덱스
        if (Object.prototype.hasOwnProperty.call(selectedIds, k)) {
          const phar_idx = selectedIds[k];  // 해당 phar_idx 값 추출
          console.log("k:", k, "phar_idx:", phar_idx); // k와 phar_idx 값 출력
  
          // DELETE 요청 보내기
          await axios.delete(`http://localhost:8080/api/phar_info/delete/${phar_idx}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }
  
      alert("삭제되었습니다.");
      setRowSelectionModel([]);  // 선택 초기화
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };



  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/phar_info/list`
      );
      console.log("서버에서 가져온 데이터:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setRows(response.data.data);
      }
    } catch (error) {
      console.log("데이터를 가져오지 못했습니다", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // 페이지 로드 시 필터링되지 않은 모든 데이터로 초기화
    setFilteredRows(rows);
  }, [rows]);

  // selectionModel 변경 시 로그 출력
  useEffect(() => {
    console.log("선택된 항목:", rowSelectionModel);
    setRowSelectionModel();
  }, []);

  // 검색어에 맞는 데이터 필터링
  const handleSearch = () => {
    console.log("검색어:", searchQuery);
    const filtered = rows.filter((row) => {
      const pharNameMatch = row.phar_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const pharAddressMatch = row.phar_address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (pharNameMatch || pharAddressMatch) {
        console.log("일치하는 항목:", row);
      }

      return pharNameMatch || pharAddressMatch;
    });

    console.log("필터링된 데이터:", filtered);
    setFilteredRows(filtered);
  };


  // 데이터 행 클릭 시 상세보기 페이지로 이동
  const handleRowClick = (params) => {
    const { phar_idx } = params.row;
    router.push(`/ad601detail?phar_idx=${phar_idx}`);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);


  const handlePageChange = (event, value) => {
    setPage(value);
  };


  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>약국 찾아보기</h1>
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

        <Link href="/ad601write" passHref>
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
            { field: "phar_idx", headerName: "ID", width: 150, align: "center" },
            { field: "phar_name", headerName: "약국명", width: 200, align: "center" },
            { field: "phar_address", headerName: "주소", width: 900, align: "center" },
          ]}
          pageSize={rowsPerPage}
          checkboxSelection
          disableSelectionOnClick
          onRowSelectionModelChange={(newSelectionModel) => {
            console.log("선택된 항목:", newSelectionModel);  // 확인용 로그
            setRowSelectionModel(newSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          scrollbarSize={0}
          onRowClick={handleRowClick}
          getRowId={(row) => row.phar_idx}
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
