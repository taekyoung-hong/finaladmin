'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from '../styles/ad202report.module.css';
import { useRouter } from 'next/navigation';

// 검색창 컴포넌트
function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <div className={styles.ad202report__searchcontainer}>
            {/* 검색 옵션 */}
            <div className={styles.ad202report__searchdropdown}>
                <select className={styles.ad202report__category} defaultValue="아이디">
                    <option value="아이디">아이디</option>
                    <option value="이름">이름</option>
                    <option value="이메일">이메일</option>
                </select>
            </div>

            {/* 검색바 */}
            <div className={styles.ad202report__searchbar}>
                <input type="text" placeholder="검색어를 입력하세요." value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="button">
                    <span className="material-symbols-outlined">search</span>
                </button>
            </div>
        </div>
    );
}

const columns = [
    { field: 'postNumber', headerName: '번호', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'report', headerName: '신고일', width: 207, align: 'center', headerAlign: 'center' },
    { field: 'story', headerName: '신고 내용', width: 400, align: 'center', headerAlign: 'center' },
    { field: 'id', headerName: '신고자', width: 207, align: 'center', headerAlign: 'center' },
    {
        field: 'done'
        , headerName: '처리 상태'
        , width: 207
        , align: 'center'
        , headerAlign: 'center'
        , renderCell: (params) => {
            const done = params.row.done;
            const color = doneColor(done);
            const fontWeight = done === '처리완료' ? '600' : '대기중';
            return (
                <span style={{ color, fontWeight }}>
                    {done}
                </span> 
            );
        }
    },



    { field: 'day', headerName: '등급', sortable: false, width: 207, align: 'center', headerAlign: 'center' },
];

const rows = [
    { report: '2024-00-00', story: '신고 합니다.', id: 'mars', done: '처리완료', day: '처리완료', authorId: 'author1', postDate: '2024-01-01', postTitle: '제목1', postContent: '내용1', reporterId: 'reporter1', reportDate: '2024-01-02', reportContent: '내용2' },
    { report: '2024-00-00', story: '신고 합니다.', id: 'earth', done: '대기중', day: '대기중', authorId: 'author2', postDate: '2024-01-03', postTitle: '제목2', postContent: '내용2', reporterId: 'reporter2', reportDate: '2024-01-04', reportContent: '내용3' },
    { report: '2024-00-00', story: '신고 합니다.', id: 'omamuama', done: '처리완료', day: '처리완료', authorId: 'author3', postDate: '2024-01-05', postTitle: '제목3', postContent: '내용3', reporterId: 'reporter3', reportDate: '2024-01-06', reportContent: '내용4' },
    { report: '2024-00-00', story: '신고 합니다.', id: 'heliopause', done: '처리완료', day: '처리완료', authorId: 'author4', postDate: '2024-01-07', postTitle: '제목4', postContent: '내용4', reporterId: 'reporter4', reportDate: '2024-01-08', reportContent: '내용5' },
    { report: '2024-00-00', story: '신고 합니다.', id: 'neptune', done: '처리완료', day: '처리완료', authorId: 'author5', postDate: '2024-01-09', postTitle: '제목5', postContent: '내용5', reporterId: 'reporter5', reportDate: '2024-01-10', reportContent: '내용6' }
];

const doneColor = (done) => {

    if (done.includes('대기중')) {
        return '';
    }

    switch (done) {
        case '처리완료':
            return '#09FF5F'

    }

};



export default function DataTable() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedReportDetails, setSelectedReportDetails] = React.useState(null);
    const [dialogPosition, setDialogPosition] = React.useState({ top: 0, left: 0 }); // 팝업 위치 상태
    const router = useRouter();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage).map((row, index) => ({
        ...row,
        postNumber: startIndex + index + 1,  // 페이지마다 번호가 1부터 시작하도록 설정
    }));

    const handleRowClick = (params, event) => {
        const { story, authorId, postDate, postTitle, postContent, reporterId, reportDate, reportContent } = params.row;

        // 상세 정보 저장
        setSelectedReportDetails({
            story,
            authorId,
            postDate,
            postTitle,
            postContent,
            reporterId,
            reportDate,
            reportContent
        });

        // 팝업 위치 설정: 클릭된 위치를 기준으로 위치 지정
        const { clientX, clientY } = event;
        setDialogPosition({
            top: clientY + 20, // 클릭한 위치에서 20px 아래로
            left: clientX + 100, // 클릭한 위치에서 100px 오른쪽으로
        });

        setOpenDialog(true); // 팝업 열기
    };

    const handleDialogClose = () => {
        setOpenDialog(false); // 팝업 닫기
        setSelectedReportDetails(null); // 선택된 story 초기화
    };




    return (
        <div className={styles.ad202report__container}>
            <h1 className={styles.ad202report__title}>전문 회원 신고 내역</h1>
            <div className={styles.ad202report__search}>
                <SearchBar />
            </div>
            <div className={styles.ad202report__table}>
                <Paper sx={{
                    width: '100%',

                }}>
                    <DataGrid
                        rows={currentRows}
                        columns={columns}
                        pageSize={rowsPerPage}
                        hideFooterPagination={true}  // 페이지네이션 숨기기
                        hideFooter={true}
                        onRowClick={(params, event) => handleRowClick(params, event)} // 행 클릭 시 위치도 함께 처리

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

            {/* 팝업 창 (div로 구현) */}
            {openDialog && (
                <div className={styles.ad202report__customDialog} >
                    <div className={styles.ad202report__dialogContent}>
                        <p className={styles.ad202report__popuptitle}>게시글</p>
                        <div className={styles.ad202report__dialogItem}>
                            <div className={styles.ad202report__reporttitle}><p>신고한 글쓴이의 아이디:</p></div> <div>{selectedReportDetails.authorId}</div>
                        </div>
                        <div className={styles.ad202report__dialogItem}>
                            <div className={styles.ad202report__reporttitle}> <p>글이 쓰여진 날짜:</p></div> <div> {selectedReportDetails.postDate}</div>
                        </div>
                        <div className={styles.ad202report__dialogItem}>
                            <div className={styles.ad202report__reporttitle}> <p>신고한 글의 제목:</p></div> <div> {selectedReportDetails.postTitle}</div>
                        </div>
                        <div className={styles.ad202report__dialogItem}>
                            <div className={styles.ad202report__reporttitle}> <p>신고한 글:</p></div> <div>{selectedReportDetails.postContent}</div>
                        </div>

                        <div className={styles.ad202report__reporter}>
                            <p className={styles.ad202report__popuptitle}>신고 내용</p>
                            <div className={styles.ad202report__reportbuttonbox}>
                                <Button onClick={handleDialogClose}

                                    color="primary"
                                    sx={{
                                        border: '1px solid #ddd',
                                        marginLeft: '5px',
                                        '&:hover': {
                                            backgroundColor: 'secondary.main',
                                            color: 'white',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                                        }

                                    }}
                                >
                                    신고 무시
                                </Button>
                                <Button onClick={handleDialogClose}

                                    color="primary"
                                    sx={{
                                        border: '1px solid #ddd',
                                        marginLeft: '5px',
                                        '&:hover': {
                                            backgroundColor: 'secondary.main',
                                            color: 'white',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                                        }
                                    }}
                                >
                                    신고글 삭제
                                </Button>
                            </div>
                        </div>
                        <div className={styles.ad202report__dialogItem}>
                            <div className={styles.ad202report__reporttitle}> <p>신고자의 아이디:</p></div> <div>{selectedReportDetails.reporterId}</div>
                        </div>
                        <div className={styles.ad202report__dialogItem}>
                            <div className={styles.ad202report__reporttitle}><p>신고한 날:</p></div> <div>{selectedReportDetails.reportDate}</div>
                        </div>
                        <div className={styles.ad202report__dialogItem}>
                            <div className={styles.ad202report__reporttitle}><p>신고한 내용:</p></div>
                            <div>{selectedReportDetails.ad202report__reportContent}</div>
                        </div>
                        <div className={styles.ad202report__popupbuttonbox}>
                            <Button onClick={handleDialogClose}

                                color="primary"
                                sx={{
                                    border: '1px solid #ddd',
                                    marginLeft: '5px',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        color: 'white',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                                    }
                                }}
                            >
                                저장
                            </Button>
                            <Button onClick={handleDialogClose}

                                color="primary"
                                sx={{
                                    border: '1px solid #ddd',
                                    marginLeft: '5px',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        color: 'white',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                                    }
                                }}
                            >
                                닫기
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
