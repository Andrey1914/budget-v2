"use client";

import React from "react";
import { Container, Box, Typography, Link } from "@mui/material";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Політика конфіденційності
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Ми дбаємо про вашу конфіденційність і прагнемо до прозорості у тому,
          як ми збираємо, використовуємо та захищаємо вашу особисту інформацію.
          У цій Політиці конфіденційності пояснюється, які дані ми збираємо, як
          їх використовуємо та які заходи безпеки вживаємо для захисту вашої
          інформації.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          1. Зібрана інформація
        </Typography>
        <Typography variant="body1" paragraph>
          Ми можемо збирати такі типи інформації:
        </Typography>
        <ul>
          <li>
            Особисті дані: ім’я, електронна пошта, телефон, адреса, дата
            народження та інші дані, які ви надаєте під час реєстрації або
            використання наших сервісів.
          </li>
          <li>
            Дані про взаємодію: інформація про те, як ви використовуєте наш
            сайт, включаючи історію відвідувань, час перебування, кліки та інші
            дії.
          </li>
          <li>
            Файли cookie: ми використовуємо cookie для покращення якості
            обслуговування, персоналізації контенту та аналізу використання
            сайту.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          2. Як ми використовуємо вашу інформацію
        </Typography>
        <Typography variant="body1" paragraph>
          Ми використовуємо вашу інформацію з такими цілями:
        </Typography>
        <ul>
          <li>Для надання наших послуг та покращення їх якості.</li>
          <li>
            Для надсилання сповіщень та інформаційних повідомлень (за вашої
            згоди).
          </li>
          <li>
            Для аналізу поведінки користувачів та оптимізації роботи сайту.
          </li>
          <li>Для виконання юридичних зобов’язань і запобігання шахрайству.</li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          3. Захист інформації
        </Typography>
        <Typography variant="body1" paragraph>
          Ми вживаємо всіх розумних заходів для захисту ваших даних від
          несанкціонованого доступу, зміни чи знищення. Усі передані дані
          захищені із використанням сучасних технологій шифрування.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          4. Доступ до вашої інформації
        </Typography>
        <Typography variant="body1" paragraph>
          Ми не передаємо ваші особисті дані третім сторонам без вашої згоди, за
          винятком випадків, передбачених законом, або нашим партнерам, які
          надають певні послуги від нашого імені.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          5. Файли cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Ми використовуємо cookie для покращення роботи сайту та надання вам
          більш персоналізованого контенту. Ви можете налаштувати свій браузер
          на відмову від використання cookie, проте це може вплинути на
          функціональність деяких частин сайту.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          6. Ваші права
        </Typography>
        <Typography variant="body1" paragraph>
          Відповідно до законодавства, ви маєте право на доступ, виправлення та
          видалення своїх особистих даних. Якщо ви хочете скористатися цими
          правами, будь ласка, зв’яжіться з нами за вказаними нижче контактними
          даними.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          7. Посилання на сторонні сайти
        </Typography>
        <Typography variant="body1" paragraph>
          Наш сайт може містити посилання на сторонні ресурси, які не
          регулюються нашою Політикою конфіденційності. Ми не несемо
          відповідальності за вміст цих сайтів або їхню політику
          конфіденційності.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          8. Зміни в Політиці конфіденційності
        </Typography>
        <Typography variant="body1" paragraph>
          Ми можемо періодично оновлювати цю Політику конфіденційності. Усі
          зміни будуть опубліковані на цій сторінці з датою останнього
          оновлення. Рекомендуємо регулярно перевіряти цю сторінку, щоб бути в
          курсі будь-яких змін.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          9. Контактна інформація
        </Typography>
        <Typography variant="body1" paragraph>
          Якщо у вас є питання або пропозиції щодо нашої Політики
          конфіденційності, будь ласка, зв’яжіться з нами:
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Електронна пошта:</strong>{" "}
          <Link href="mailto:support@yourdomain.com">
            support@yourdomain.com
          </Link>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Адреса:</strong> Ваша адреса компанії
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;
