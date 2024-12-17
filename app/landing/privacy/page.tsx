"use client";

import React from "react";
import { Container, Box, Typography, Link } from "@mui/material";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Политика конфиденциальности
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Мы заботимся о вашей конфиденциальности и стремимся обеспечить
          прозрачность в том, как мы собираем, используем и защищаем вашу личную
          информацию. В этой Политике конфиденциальности объясняется, какие
          данные мы собираем, как их используем, и какие меры безопасности
          предпринимаем для защиты вашей информации.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          1. Собираемая информация
        </Typography>
        <Typography variant="body1" paragraph>
          Мы можем собирать следующие типы информации:
        </Typography>
        <ul>
          <li>
            Личные данные: имя, электронная почта, телефон, адрес, дата рождения
            и другие данные, которые вы предоставляете при регистрации или
            использовании наших сервисов.
          </li>
          <li>
            Данные о взаимодействии: информацию о том, как вы используете наш
            сайт, включая историю посещений, время на сайте, клики и другие
            действия.
          </li>
          <li>
            Файлы cookie: мы используем файлы cookie для улучшения качества
            обслуживания, персонализации контента и анализа использования сайта.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          2. Как мы используем вашу информацию
        </Typography>
        <Typography variant="body1" paragraph>
          Мы используем вашу информацию для следующих целей:
        </Typography>
        <ul>
          <li>Для предоставления наших услуг и улучшения их качества.</li>
          <li>
            Для отправки уведомлений и информационных сообщений (если вы дали
            согласие).
          </li>
          <li>
            Для анализа пользовательского поведения и оптимизации работы сайта.
          </li>
          <li>
            Для соблюдения юридических обязательств и предотвращения
            мошенничества.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          3. Защита информации
        </Typography>
        <Typography variant="body1" paragraph>
          Мы принимаем все разумные меры для защиты ваших данных от
          несанкционированного доступа, изменения или уничтожения. Все
          передаваемые данные защищены с использованием современных технологий
          шифрования.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          4. Доступ к вашей информации
        </Typography>
        <Typography variant="body1" paragraph>
          Мы не передаем ваши личные данные третьим лицам без вашего согласия,
          за исключением случаев, предусмотренных законом или в случае с нашими
          партнерами, которые предоставляют определенные услуги от нашего имени.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          5. Файлы cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Мы используем файлы cookie для улучшения работы сайта и предоставления
          вам более персонализированного контента. Вы можете настроить свой
          браузер для отказа от использования cookie, но это может повлиять на
          функциональность некоторых частей сайта.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          6. Ваши права
        </Typography>
        <Typography variant="body1" paragraph>
          В соответствии с законодательством, у вас есть право на доступ,
          исправление и удаление своих личных данных. Если вы хотите
          воспользоваться этими правами, пожалуйста, свяжитесь с нами по
          указанным ниже контактным данным.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          7. Ссылки на сторонние сайты
        </Typography>
        <Typography variant="body1" paragraph>
          Наш сайт может содержать ссылки на сторонние сайты, которые не
          регулируются нашей Политикой конфиденциальности. Мы не несем
          ответственности за содержание этих сайтов или за их политику
          конфиденциальности.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          8. Изменения в Политике конфиденциальности
        </Typography>
        <Typography variant="body1" paragraph>
          Мы можем периодически обновлять эту Политику конфиденциальности. Все
          изменения будут опубликованы на этой странице с указанием даты
          последнего обновления. Мы рекомендуем регулярно проверять эту страницу
          для того, чтобы быть в курсе любых изменений.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          9. Контактная информация
        </Typography>
        <Typography variant="body1" paragraph>
          Если у вас есть вопросы или предложения по поводу нашей Политики
          конфиденциальности, пожалуйста, свяжитесь с нами:
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Электронная почта:</strong>{" "}
          <Link href="mailto:support@yourdomain.com">
            support@yourdomain.com
          </Link>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Адрес:</strong> Ваш адрес компании
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;
