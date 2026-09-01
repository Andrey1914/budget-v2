"use client";

import React from "react";
import { Container, Box, Typography } from "@mui/material";

const UserAgreementPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Користувацька угода
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          1. Загальні положення
        </Typography>
        <Typography variant="body1">
          Ця Користувацька угода (далі — &quot;Угода&quot;) регулює відносини
          між користувачем (далі — &quot;Користувач&quot;) і додатком (далі —
          &quot;Сервіс&quot;). Зареєструвавшись або використовуючи Сервіс, ви
          погоджуєтесь з умовами цієї Угоди.
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          2. Реєстрація та обліковий запис
        </Typography>
        <Typography variant="body1">
          2.1. Для використання всіх функцій Сервісу необхідно пройти
          реєстрацію, вказавши достовірні дані.
          <br />
          2.2. Користувач несе відповідальність за безпеку своїх даних (логін та
          пароль) і зобов’язується не передавати їх третім особам.
          <br />
          2.3. У разі втрати даних Користувач зобов’язаний негайно повідомити
          Сервіс для запобігання несанкціонованому доступу.
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          3. Використання Сервісу
        </Typography>
        <Typography variant="body1">
          3.1. Користувач зобов’язується використовувати Сервіс виключно в
          законних цілях.
          <br />
          3.2. Заборонено: публікація незаконного контенту, шахрайство, спроби
          злому системи або інші дії, що порушують законодавство.
          <br />
          3.3. Адміністрація Сервісу залишає за собою право обмежити доступ до
          облікового запису Користувача у разі порушень.
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          4. Конфіденційність
        </Typography>
        <Typography variant="body1">
          4.1. Персональні дані Користувачів обробляються відповідно до Політики
          конфіденційності.
          <br />
          4.2. Сервіс зобов’язується не передавати персональні дані Користувачів
          третім особам без їх згоди, за винятком випадків, передбачених
          законом.
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          5. Обмеження відповідальності
        </Typography>
        <Typography variant="body1">
          5.1. Сервіс надається &quot;як є&quot;. Адміністрація не гарантує
          відсутність помилок або безперебійну роботу.
          <br />
          5.2. Сервіс не несе відповідальності за збитки, пов’язані з
          використанням або неможливістю використання Сервісу.
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          6. Зміни до Угоди
        </Typography>
        <Typography variant="body1">
          6.1. Адміністрація залишає за собою право вносити зміни до цієї Угоди.
          Нова версія набирає чинності з моменту її публікації.
          <br />
          6.2. Користувач зобов’язується самостійно стежити за змінами в Угоді.
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          7. Контакти
        </Typography>
        <Typography variant="body1">
          З усіх питань ви можете зв’язатися з нами за адресою:{" "}
          <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </Typography>
      </Box>
    </Container>
  );
};

export default UserAgreementPage;
