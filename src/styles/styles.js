import styled from 'styled-components'

export const HeaderUserInfo = styled.div`
  width: 100%;
  /* height: 2%; */
  /* margin-top: 15%; */
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 1rem;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    margin-top: 0;
  }
`

export const LogoLogin = styled.img`
  width: 100%;
  height: 100%;
  /* min-width: 200px;
  min-height: 200px; */
`
export const ContainerLogin = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`
export const Buttons = styled.button`
  border: 0;
  width: 100%;
  height: 25px;
  margin-top: 1rem;
  cursor: pointer;
`
