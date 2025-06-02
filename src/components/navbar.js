import './home.css';
import './navbar/navbar.css'
import styled from '@emotion/styled';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Button, Drawer, Grid } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { logout } from '../actions/userAction';
import LeftDrawer from './navbar/leftDrawer';
import { FURL } from '../constants/userConstants';

const RightSide = styled.div`
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: auto;
    justify-content: flex-end;
  }
`;

const Account = styled.h3`
  font-size: 12px;
  border-radius: 50%;
  background-color: #ffffff;
  color: var(--red);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  font-weight: 700;
  @media only screen and (min-width: 600px) {
    font-size: 34px;
    font-weight: 800;
  }
`;
const EmojiIcon = styled(EmojiEventsOutlinedIcon)`
              margin-right: 10px;
              font-size: 20px;
              stroke: white;
              stroke-width: 1.5;
  @media only screen and (min-width: 600px) {
    font-size: 34px;
    font-weight: 800;
  }
`

const WithdrawContainer = styled(Grid)``;

const AddButton = styled(Button)`
  background-color: var(--green);
  color: #ffffff;
  width: 160px;
  margin: 0 auto;
  &:hover {
    background-color: var(--green);
    color: #ffffff;
  }
`;

const Deatil = styled.div`
  border-top: 1px solid #dddddd;
  margin-top: 10px;
  text-align: left;
  padding: 10px 5px;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;

const DeatilTop = styled.div`
  margin-top: 10px;
  text-align: center;
  padding: 10px 0;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;

const NotificationContainer = styled.div`
  width: 320px;
  padding: 20px;
  background-color: #f9f9f9;
  height: 100%;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const NotificationHeader = styled.h4`
  margin: 0;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  color: var(--dark);
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const NotificationItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  color: #333;
  font-size: 14px;
`;

const EmptyMessage = styled.p`
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-top: 40px;
`;

export function Navbar({ home }) {
  const { user } = useSelector((state) => state.user);
  const { config } = useSelector((state) => state.config);
  const [notificationOpen, setNotificationOpen] = useState(false);
  console.log(config, 'configs')
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const dispatch = useDispatch;
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };
  const handleLeftClick = () => {
    setLeftOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {' '}
      <LeftDrawer
        leftOpen={leftOpen}
        setLeftOpen={setLeftOpen}
        open={open}
        setOpen={setOpen}
      />
      <div className="navtopbar">
        <Account
          onClick={() => handleLeftClick()}
          style={{ cursor: 'pointer' }}
          className="name"
        >
          {user?.username && user?.username.charAt(0)}
        </Account>
        <Center>
          {/*{config?.[0]?.name}*/}
          <img src={`${FURL}/mango.png`} alt='logo' style={{ width: '110px', maxHeight: '40px', marginLeft: '10px' }} />
        </Center>
        <RightSide>

          <NotificationAddOutlinedIcon
            onClick={() => setNotificationOpen(true)}
            style={{
              marginRight: '10px',
              cursor: 'pointer',
              fontSize: '20px',
              stroke: 'white',
              strokeWidth: '1.5',
            }}
          />

          <Drawer anchor="right" open={notificationOpen} onClose={() => setNotificationOpen(false)}>
            <NotificationContainer>
              <NotificationHeader>Notifications</NotificationHeader>
              {user?.notifications?.length > 0 ? (
                user.notifications.map((note, idx) => (
                  <NotificationItem key={idx}>{note.message}</NotificationItem>
                ))
              ) : (
                <EmptyMessage>No new notifications</EmptyMessage>
              )}
            </NotificationContainer>
          </Drawer>

          <AccountBalanceWalletOutlinedIcon
            onClick={() => handleClick()}
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              stroke: 'white',
              strokeWidth: '1.5',
            }}
          />
        </RightSide>
      </div>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <DeatilTop>
          <p>total balance</p>
          <h5>
            ₹
            {user && user.wallet}
          </h5>
        </DeatilTop>
        <AddButton
          onClick={() => navigate('/payment', {
            state: {
              tab: 'deposit',
            },
          })}
        >
          add cash
        </AddButton>
        <Deatil>
          <p>Amount added</p>
          <h5>
            ₹
            {user?.totalAmountAdded}
          </h5>
        </Deatil>
        <Deatil>
          <WithdrawContainer container>
            <Grid item sm={7} xs={7}>
              <p>winnings</p>
              <h5>
                ₹
                {user?.totalAmountWon}
              </h5>
            </Grid>
            <Grid item sm={5} xx={5}>
              <Button
                onClick={() => navigate('/transaction', {
                  state: {
                    tab: 'withdrawal',
                  },
                })}
              >
                Withdraw
              </Button>
            </Grid>
          </WithdrawContainer>
        </Deatil>
        <Deatil>
          <p>cash bonus</p>
          <h5>₹ 0</h5>
        </Deatil>
      </Drawer>{/*
      <Bottomnav />
      {home && (
        {/*<div className="hometop">
          <div
            onClick={() => navigate('/')}
            className={
              location.pathname == '/'
                ? 'hometopicon selectgame'
                : 'hometopicon'
            }
          >
            <SportsCricketIcon
              style={{ fontSize: '20px', fontWeight: '400' }}
              className={location.pathname == '/' ? 'selectedIcon' : ''}
            />
            <h5>Cricket</h5>
          </div>
          <div
            onClick={() => navigate('/football')}
            className={
              location.pathname == '/football'
                ? 'hometopicon selectgame'
                : 'hometopicon'
            }
            style={{ fontSize: '12px', fontWeight: '400' }}
          >
            <SportsSoccerIcon style={{ fontSize: '20px', fontWeight: '400' }} />
            <h5>Football</h5>
          </div>
          <div
            className="hometopicon"
            style={{ fontSize: '12px', fontWeight: '400' }}
          >
            <SportsBasketballIcon
              style={{ fontSize: '20px', fontWeight: '400' }}
            />
            <h5>Basketball</h5>
          </div>
          <div
            className="hometopicon"
            style={{ fontSize: '12px', fontWeight: '400' }}
          >
            <SportsHockeyIcon style={{ fontSize: '20px', fontWeight: '400' }} />
            <h5>Hockey</h5>
          </div>
        </div>
      )}*/}
    </>
  );
}

export default Navbar;
