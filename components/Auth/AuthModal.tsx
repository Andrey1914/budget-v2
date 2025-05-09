"use client";

import React, { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import SwiperCore from "swiper";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  IconButton,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import LoginTab from "@/components/Auth/Login/LoginForm";
import RegisterTab from "@/components/Auth/Registration/RegisterForm";
import ResetPasswordModal from "@/components/Auth/Login/ResetPasswordForm";
import VerifyEmailModal from "@/components/Auth/Registration/VerifyEmailForm";
import authBg from "@/public/auth-bg.jpg";

interface Props {
  open: boolean;
  onClose: () => void;
  initialTab?: number;
}

const AuthTabsModal: React.FC<Props> = ({ open, onClose, initialTab = 0 }) => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const [tabIndex, setTabIndex] = useState(initialTab);
  const theme = useTheme();
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    if (open) {
      setTabIndex(initialTab);
      swiperRef.current?.slideTo(initialTab);
    }
  }, [open, initialTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    swiperRef.current?.slideTo(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box
        sx={{
          backgroundImage: `url(${authBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
        >
          <Close />
        </IconButton>

        <DialogContent
          sx={{
            width: "436px",
            ml: "auto",
            p: "34px 40px 28px",
            backgroundColor: "rgba(0, 15, 5, 0.85)",
          }}
        >
          <Box>
            {showResetPassword ? (
              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  fontSize: "20px",
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Введіть новий пароль
              </Typography>
            ) : showEmailVerification ? (
              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  fontSize: "20px",
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Ми надіслали код на вашу пошту. Перевірте пошту та введіть код
                нижче.
              </Typography>
            ) : (
              <>
                <Typography
                  variant="h2"
                  sx={{
                    color: "#fff",
                    fontSize: "20px",
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Для початку роботи, будь ласка, авторизуйтесь.
                </Typography>
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  centered
                  TabIndicatorProps={{ style: { display: "none" } }}
                  sx={{
                    "& .MuiTab-root": {
                      color: "#fff",
                      fontWeight: "bold",
                      minWidth: "50%",
                      borderBottom: "2px solid #fff",
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: "#3A9A5B",
                      borderBottom: "2px solid #3A9A5B",
                    },
                  }}
                >
                  <Tab label="LOGIN" />
                  <Tab label="REGISTRATION" />
                </Tabs>
              </>
            )}

            <Box sx={{ mt: 2 }}>
              <Swiper
                onSlideChange={(swiper) => setTabIndex(swiper.activeIndex)}
                onSwiper={(swiperInstance) => {
                  swiperRef.current = swiperInstance;
                }}
                spaceBetween={10}
                slidesPerView={1}
              >
                {showResetPassword ? (
                  <SwiperSlide>
                    <ResetPasswordModal
                      onCancel={() => setShowResetPassword(false)}
                    />
                  </SwiperSlide>
                ) : showEmailVerification ? (
                  <SwiperSlide>
                    <VerifyEmailModal
                      onVerified={() => setShowEmailVerification(false)}
                      onCancel={() => setShowEmailVerification(false)}
                    />
                  </SwiperSlide>
                ) : (
                  <>
                    <SwiperSlide>
                      <LoginTab
                        onForgotPassword={() => setShowResetPassword(true)}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <RegisterTab
                        onSuccessRegistration={() =>
                          setShowEmailVerification(true)
                        }
                      />
                    </SwiperSlide>
                  </>
                )}
              </Swiper>
            </Box>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AuthTabsModal;
