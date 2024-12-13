'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad201.module.css'
import { useRouter } from 'next/navigation';


// 검색창 컴포넌트
function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <div className={styles.ad201__searchcontainer}>
            {/* 검색 옵션 */}
            <div className={styles.ad201__searchdropdown}>
                <select className={styles.ad201__category} defaultValue="아이디">
                    <option value="아이디">아이디</option>
                    <option value="이름">이름</option>
                    <option value="이메일">이메일</option>
                </select>
            </div>

            {/* 검색바 */}
            <div className={styles.ad201__searchbar}>
                <input type="text" placeholder="검색어를 입력하세요." value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="button" >
                    <span className="material-symbols-outlined">search</span>
                </button>
            </div>
        </div>
    );
}

const columns = [
    { field: 'id', headerName: '아이디', width: 207, align: 'center' },
    { field: 'Name', headerName: '이름', width: 207 ,align: 'center'},
    { field: 'email', headerName: '이메일', width: 400 ,align: 'center'},
    { field: 'regdate', headerName: '최초 가입일', width: 207 ,align: 'center'},
    { field: 'level', headerName: '등급', sortable: false, width: 103 ,align: 'center'},
    {
        field: 'report',
        headerName: '상태',
        sortable: false,
        width: 104,
        renderCell: (params) => {
            const report = params.row.report;
            const color = reportColor(report);  // 색상 계산
            // '경고'나 '정지'일 때 fontWeight: '600' 적용
            const fontWeight = report === '경고' || report === '정지' ? '600' : 'normal';
            return (
                <span style={{ color, fontWeight }}>
                    {report}
                </span>
            );
        }
    }
];

const rows = [
    { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'park', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'kim', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'lee', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'yoon', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'sdkw', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'asdf', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'sadeee', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'hhhg', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'hosdfng', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'sdrkfs', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'sdewr', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'zcgh', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '경고' },
    { id: 'qhjm', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'ssgjt', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'deey', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'ercge', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'yhnv', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'ddddd', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'eeeee', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'qqqqq', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'aaaaa', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'yyyyy', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '정지' },
    { id: 'gjklkl', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'hhhhh', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'ttgb', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'cccd', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'ddcccc', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'cddd', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'fffff', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'ffafff', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'fffd', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'dddsd', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },
    { id: 'ddedd', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'eedddcc', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반', report: '일반' },


];
const reportColor = (report) => {

    if (report.includes('일반')) {
        return '';
    }
    switch (report) {
        case '경고':
            return '#F1B840' // 경고는 노란색
        case '정지':
            return 'red' // 정지는 빨간색
        default:
            return 'black'; // 기본은 검은색
    }
};


export default function DataTable() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
    const router = useRouter();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

    const handleRowClick = (params) => {
        const { id } = params.row;
        router.push(`/ad201_detail`); // 상세보기 페이지로 이동
    };


    return (
        <div className={styles.ad201__container}>
            <h1 className={styles.ad201__title}>일반 회원 관리</h1>
            <div className={styles.ad201__search}>
                <SearchBar />
            </div>
            <div className={styles.ad201__table}>
                <Paper sx={{ width: '100%' }}>
                    <DataGrid
                        rows={currentRows}
                        columns={columns}
                        pageSize={rowsPerPage}
                        checkboxSelection
                        hideFooterPagination={true}  // 페이지네이션 숨기기
                        hideFooter={true}
                        onRowClick={handleRowClick} // 행 클릭 이벤트 핸들러 추가
                    />
                </Paper>
            </div>
            <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)} // 총 페이지 수 계산
                    page={page}
                    onChange={handlePageChange}
                    color="secondary"
                />
            </Stack>
        </div>
    );
}