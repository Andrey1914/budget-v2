"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

const UserAgreementPage: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Пользовательское соглашение
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        1. Общие положения
      </Typography>
      <Typography variant="body1">
        Настоящее Пользовательское соглашение (далее — &quot;Соглашение&quot;)
        регулирует отношения между пользователем (далее —
        &quot;Пользователь&quot;) и приложением (далее — &quot;Сервис&quot;).
        Зарегистрировавшись или используя Сервис, вы соглашаетесь с условиями
        настоящего Соглашения.
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        2. Регистрация и аккаунт
      </Typography>
      <Typography variant="body1">
        2.1. Для использования всех функций Сервиса необходимо пройти
        регистрацию, указав достоверные данные.
        <br />
        2.2. Пользователь несет ответственность за безопасность своих данных
        (логин и пароль) и обязуется не передавать их третьим лицам.
        <br />
        2.3. В случае утраты данных Пользователь обязан незамедлительно
        уведомить Сервис для предотвращения несанкционированного доступа.
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        3. Использование Сервиса
      </Typography>
      <Typography variant="body1">
        3.1. Пользователь обязуется использовать Сервис только в законных целях.
        <br />
        3.2. Запрещено: публикация незаконного контента, мошенничество, попытки
        взлома системы или иное поведение, нарушающее законодательство.
        <br />
        3.3. Администрация Сервиса оставляет за собой право ограничить доступ к
        аккаунту Пользователя в случае нарушений.
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        4. Конфиденциальность
      </Typography>
      <Typography variant="body1">
        4.1. Персональные данные Пользователей обрабатываются в соответствии с
        Политикой конфиденциальности.
        <br />
        4.2. Сервис обязуется не передавать персональные данные Пользователей
        третьим лицам без их согласия, за исключением случаев, предусмотренных
        законом.
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        5. Ограничение ответственности
      </Typography>
      <Typography variant="body1">
        5.1. Сервис предоставляется &quot;как есть&quot;. Администрация не
        гарантирует отсутствие ошибок или бесперебойную работу.
        <br />
        5.2. Сервис не несет ответственности за убытки, связанные с
        использованием или невозможностью использования Сервиса.
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        6. Изменения в Соглашении
      </Typography>
      <Typography variant="body1">
        6.1. Администрация оставляет за собой право вносить изменения в
        настоящее Соглашение. Новая версия вступает в силу с момента её
        публикации.
        <br />
        6.2. Пользователь обязуется самостоятельно отслеживать изменения в
        Соглашении.
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        7. Контакты
      </Typography>
      <Typography variant="body1">
        По всем вопросам вы можете связаться с нами по адресу:{" "}
        <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
      </Typography>
    </Box>
  );
};

export default UserAgreementPage;
