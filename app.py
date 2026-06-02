import os

import pandas as pd
import streamlit as st


st.set_page_config(
    page_title="댕댕여지도",
    page_icon="🐾",
    layout="wide",
)


DEFAULT_PLACES = [
    {
        "name": "서울숲 반려견 산책길",
        "category": "산책",
        "region": "서울",
        "lat": 37.5446,
        "lon": 127.0374,
        "rating": 4.7,
        "description": "넓은 산책로와 휴식 공간이 있는 반려견 동반 산책 명소",
    },
    {
        "name": "한강 반포공원",
        "category": "공원",
        "region": "서울",
        "lat": 37.5126,
        "lon": 126.9960,
        "rating": 4.5,
        "description": "강변 산책과 피크닉을 함께 즐기기 좋은 공간",
    },
    {
        "name": "송도 센트럴파크",
        "category": "공원",
        "region": "인천",
        "lat": 37.3926,
        "lon": 126.6395,
        "rating": 4.6,
        "description": "도심 속 수변공원으로 산책 동선이 편한 장소",
    },
    {
        "name": "광교호수공원",
        "category": "산책",
        "region": "경기",
        "lat": 37.2838,
        "lon": 127.0650,
        "rating": 4.8,
        "description": "호수 둘레길이 잘 정비되어 있는 반려견 산책 코스",
    },
    {
        "name": "부산 민락수변공원",
        "category": "해변",
        "region": "부산",
        "lat": 35.1532,
        "lon": 129.1246,
        "rating": 4.4,
        "description": "바다 전망과 산책을 함께 즐길 수 있는 수변 공간",
    },
]


def load_places() -> pd.DataFrame:
    if "places" not in st.session_state:
        st.session_state.places = pd.DataFrame(DEFAULT_PLACES)
    return st.session_state.places


def add_place(place: dict) -> None:
    st.session_state.places = pd.concat(
        [st.session_state.places, pd.DataFrame([place])],
        ignore_index=True,
    )


def render_place_card(place: pd.Series) -> None:
    st.markdown(f"### {place['name']}")
    st.write(place["description"])
    st.caption(
        f"{place['region']} · {place['category']} · 평점 {place['rating']:.1f}"
    )


places = load_places()

st.title("댕댕여지도")
st.caption("with your bestfriends wherever")

with st.sidebar:
    st.header("필터")
    regions = ["전체"] + sorted(places["region"].unique().tolist())
    categories = ["전체"] + sorted(places["category"].unique().tolist())

    selected_region = st.selectbox("지역", regions)
    selected_category = st.selectbox("공간 유형", categories)
    min_rating = st.slider("최소 평점", 0.0, 5.0, 0.0, 0.1)

    st.divider()
    st.header("Railway 배포")
    st.code(
        "streamlit run app.py --server.address 0.0.0.0 --server.port $PORT",
        language="bash",
    )

filtered = places.copy()
if selected_region != "전체":
    filtered = filtered[filtered["region"] == selected_region]
if selected_category != "전체":
    filtered = filtered[filtered["category"] == selected_category]
filtered = filtered[filtered["rating"] >= min_rating]

summary_cols = st.columns(3)
summary_cols[0].metric("등록 장소", len(places))
summary_cols[1].metric("검색 결과", len(filtered))
summary_cols[2].metric(
    "평균 평점",
    f"{filtered['rating'].mean():.1f}" if not filtered.empty else "-",
)

map_col, list_col = st.columns([1.35, 1])

with map_col:
    st.subheader("지도")
    if filtered.empty:
        st.info("조건에 맞는 장소가 없습니다.")
    else:
        st.map(filtered, latitude="lat", longitude="lon", zoom=10)

with list_col:
    st.subheader("장소 목록")
    if filtered.empty:
        st.write("필터를 조정해보세요.")
    else:
        for _, place in filtered.sort_values("rating", ascending=False).iterrows():
            with st.container(border=True):
                render_place_card(place)

st.divider()
st.subheader("장소 제보하기")

with st.form("place_form"):
    form_cols = st.columns(2)
    name = form_cols[0].text_input("장소명")
    region = form_cols[1].text_input("지역", placeholder="예: 서울")

    category = form_cols[0].selectbox(
        "공간 유형",
        ["산책", "공원", "카페", "식당", "숙소", "해변", "기타"],
    )
    rating = form_cols[1].slider("평점", 0.0, 5.0, 4.0, 0.1)

    lat = form_cols[0].number_input("위도", value=37.5665, format="%.6f")
    lon = form_cols[1].number_input("경도", value=126.9780, format="%.6f")
    description = st.text_area("설명", placeholder="반려견과 함께 이용하기 좋은 이유를 적어주세요.")

    submitted = st.form_submit_button("등록")

if submitted:
    if not name or not region or not description:
        st.warning("장소명, 지역, 설명을 모두 입력해주세요.")
    else:
        add_place(
            {
                "name": name,
                "category": category,
                "region": region,
                "lat": lat,
                "lon": lon,
                "rating": rating,
                "description": description,
            }
        )
        st.success("장소가 등록되었습니다. 필터를 조정하거나 새로고침해서 확인해보세요.")
        st.rerun()

with st.expander("환경 정보"):
    st.write("Railway PORT:", os.getenv("PORT", "로컬 실행 중"))
