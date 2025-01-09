"use client"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import adcommons from "../styles/adcommons.module.css";
import styles from '../styles/ad601.module.css';
import axios from 'axios';

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className={adcommons.adcommons__searchcontainer}>
      {/* 검색바 */}
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
    // rowSelectionModel에서 box_idx 추출
    const selectedIds = Array.isArray(rowSelectionModel) ? rowSelectionModel : [];

    console.log("selectedIds:", selectedIds);

    if (selectedIds.length === 0) {
      alert("삭제할 항목을 선택해 주세요.");
      return;
    }

    try {
      // selectedIds 배열의 각 요소를 순회
      for (const box_idx of selectedIds) {
        console.log("삭제할 약국 ID:", box_idx);

        // DELETE 요청 보내기
        await axios.post(`http://localhost:8080/api/box_info/delete/${box_idx}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      alert("삭제되었습니다.");
      setRowSelectionModel([]);  // 선택 초기화
      window.location.reload();
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/box_info/list`);
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



  // 검색어에 맞는 데이터 필터링
  const handleSearch = () => {
    console.log("검색어:", searchQuery); // 검색어 출력
    const filtered = rows.filter(row => {
      const boxNameMatch = row.box_name.toLowerCase().includes(searchQuery.toLowerCase());
      const boxAddressMatch = row.box_address.toLowerCase().includes(searchQuery.toLowerCase());

      if (boxNameMatch || boxAddressMatch) {
        console.log("일치하는 항목:", row); // 일치하는 항목 출력
      }

      return boxNameMatch || boxAddressMatch;
    });

    console.log("필터링된 데이터:", filtered); // 필터링된 데이터 출력
    setFilteredRows(filtered); // 필터링된 데이터 상태 업데이트
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 데이터 행 클릭 시 상세보기 페이지로 이동
  const handleRowClick = (params) => {
    const { box_idx } = params.row;
    router.push(`/ad602detail?box_idx=${box_idx}`);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>폐의약품 수거함 찾아보기</h1>
      <div className={styles.ad601__search}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </div>

      <div className={adcommons.adcommons__buttoncontainer} style={{ marginTop: "25px" }}>
        <Button
          variant="outlined"
          size="medium"
          sx={{
            backgroundColor: 'white',
            color: '#9C27B0',
            border: '1px solid #9C27B0',
            borderRadius: '42px',
            '&:hover': {
              backgroundColor: 'secondary.main',
              color: 'white',
              border: '1px solid #9e9e9e',
            },
          }}
          onClick={handleDelete}  // handleDelete 바로 사용
        >
          삭제하기
        </Button>

        <Link href="/ad602write" passHref>
          <Button
            variant="outlined"
            size="medium"
            sx={{
              backgroundColor: 'white',
              color: '#9C27B0',
              border: '1px solid #9C27B0',
              borderRadius: '42px',
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'white',
                border: '1px solid #9e9e9e',
              },
            }}
          >
            추가하기
          </Button>
        </Link>
      </div>


      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={currentRows}
            columns={[
              { field: 'box_idx', headerName: 'ID', width: 150, align: 'center' },
              { field: 'box_name', headerName: '약국명', width: 200, align: 'center' },
              { field: 'box_address', headerName: '주소', width: 900, align: 'center' },
            ]}
            pageSize={rowsPerPage}
            checkboxSelection
            onRowSelectionModelChange={(newSelectionModel) => {
              // newSelectionModel에서 box_idx 추출
              console.log("새로운 선택된 ID들:", newSelectionModel);  // 확인용 로그
              setRowSelectionModel(newSelectionModel);  // 새로운 selection model 그대로 사용
            }}
            rowSelectionModel={rowSelectionModel}
            disableSelectionOnClick
            hideFooterPagination
            hideFooter
            scrollbarSize={0}
            onRowClick={handleRowClick}
            getRowId={(row) => row.box_idx} // 반드시 `box_idx`를 고유 ID로 사용
          />
        </Paper>
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
