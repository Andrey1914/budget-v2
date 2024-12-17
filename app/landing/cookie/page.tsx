"use client";

import { Container, Box, Typography, Link } from "@mui/material";

const CookiePolicyPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Политика в отношении файлов cookie
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Мы используем файлы cookie, чтобы улучшить работу нашего сайта и
          предоставить вам лучший пользовательский опыт. В этой Политике мы
          объясняем, что такое файлы cookie, как мы их используем и как вы
          можете их контролировать.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          1. Что такое файлы cookie?
        </Typography>
        <Typography variant="body1" paragraph>
          Файл cookie — это небольшой фрагмент данных, который сохраняется в
          вашем браузере или на устройстве при посещении веб-сайта. Cookies
          могут содержать различную информацию, включая идентификаторы сессий,
          настройки пользователя и данные о том, как вы взаимодействуете с
          веб-сайтом.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          2. Как мы используем файлы cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Мы используем файлы cookie для следующих целей:
        </Typography>
        <ul>
          <li>
            <strong>Персонализация:</strong> Мы используем cookie для
            запоминания ваших предпочтений, таких как язык или местоположение,
            чтобы улучшить ваш опыт на сайте.
          </li>
          <li>
            <strong>Аналитика:</strong> Мы используем cookie для сбора
            информации о том, как вы используете наш сайт, чтобы анализировать и
            улучшать его производительность.
          </li>
          <li>
            <strong>Рекламные технологии:</strong> Мы используем cookie для
            показа вам релевантной рекламы, основанной на ваших интересах и
            поведении на сайте.
          </li>
          <li>
            <strong>Безопасность:</strong> Мы используем cookie для обеспечения
            безопасности вашего аккаунта и предотвращения несанкционированного
            доступа.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          3. Типы файлов cookie, которые мы используем
        </Typography>
        <Typography variant="body1" paragraph>
          Мы используем следующие типы файлов cookie:
        </Typography>
        <ul>
          <li>
            <strong>Необходимые cookies:</strong> Эти файлы cookie необходимы
            для нормальной работы сайта и обеспечения его безопасности.
            Например, они позволяют вам сохранять товары в корзине или входить в
            ваш аккаунт.
          </li>
          <li>
            <strong>Функциональные cookies:</strong> Эти файлы cookie позволяют
            запоминать ваши предпочтения и улучшать ваш опыт. Например, они
            могут сохранять ваш выбор языка или настройки отображения.
          </li>
          <li>
            <strong>Аналитические cookies:</strong> Эти файлы cookie собирают
            информацию о том, как вы используете сайт, например, какие страницы
            посещаете, сколько времени проводите на сайте, и на основе этих
            данных мы можем улучшать сайт.
          </li>
          <li>
            <strong>Рекламные cookies:</strong> Эти файлы cookie используются
            для показа вам персонализированных рекламных объявлений, которые
            могут вас заинтересовать.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          4. Как управлять файлами cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Вы можете управлять настройками cookies в своем браузере. Почти все
          браузеры позволяют вам блокировать или удалять файлы cookie. Однако
          следует помнить, что это может повлиять на функциональность некоторых
          частей нашего сайта.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          5. Как отключить файлы cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Для отключения файлов cookie выполните следующие действия в вашем
          браузере:
        </Typography>
        <ul>
          <li>
            <strong>Google Chrome:</strong> Перейдите в настройки &gt;
            Конфиденциальность и безопасность &gt; Файлы cookie и другие данные
            сайтов, и выберите желаемые параметры.
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Перейдите в настройки &gt;
            Приватность и безопасность &gt; История, и настройте параметры
            cookies.
          </li>
          <li>
            <strong>Safari:</strong> Перейдите в настройки &gt; Safari &gt;
            Конфиденциальность, и выберите желаемые параметры.
          </li>
          <li>
            <strong>Microsoft Edge:</strong> Перейдите в настройки &gt;
            Конфиденциальность, поиск и сервисы &gt; Cookies, и выберите
            желаемые параметры.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          6. Изменения в Политике в отношении файлов cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Мы можем периодически обновлять нашу Политику в отношении файлов
          cookie. Все изменения будут опубликованы на этой странице с указанием
          даты последнего обновления.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          7. Контактная информация
        </Typography>
        <Typography variant="body1" paragraph>
          Если у вас есть вопросы по нашей Политике в отношении файлов cookie,
          пожалуйста, свяжитесь с нами по адресу:
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

export default CookiePolicyPage;
