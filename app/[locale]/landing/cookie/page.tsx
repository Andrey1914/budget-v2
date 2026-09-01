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
          Ми використовуємо файли cookie, щоб покращити роботу нашого сайту та
          надати вам кращий користувацький досвід. У цій Політиці ми пояснюємо,
          що таке файли cookie, як ми їх використовуємо та як ви можете ними
          керувати.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          1. Що таке файли cookie?
        </Typography>
        <Typography variant="body1" paragraph>
          Файл cookie — це невеликий фрагмент даних, який зберігається у вашому
          браузері або на пристрої під час відвідування вебсайту. Cookie можуть
          містити різну інформацію, включаючи ідентифікатори сесій, налаштування
          користувача та дані про вашу взаємодію з вебсайтом.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          2. Як ми використовуємо файли cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Ми використовуємо файли cookie для таких цілей:
        </Typography>
        <ul>
          <li>
            <strong>Персоналізація:</strong> Ми використовуємо cookie для
            запам’ятовування ваших вподобань, таких як мова чи місцезнаходження,
            щоб покращити ваш досвід користування сайтом.
          </li>
          <li>
            <strong>Аналітика:</strong> Ми збираємо інформацію про те, як ви
            використовуєте наш сайт, щоб аналізувати й покращувати його
            продуктивність.
          </li>
          <li>
            <strong>Рекламні технології:</strong> Cookie дозволяють нам
            показувати вам релевантну рекламу, засновану на ваших інтересах і
            поведінці на сайті.
          </li>
          <li>
            <strong>Безпека:</strong> Cookie допомагають забезпечити безпеку
            вашого акаунту та запобігти несанкціонованому доступу.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          3. Типи файлів cookie, які ми використовуємо
        </Typography>
        <Typography variant="body1" paragraph>
          Ми використовуємо такі типи cookie:
        </Typography>
        <ul>
          <li>
            <strong>Необхідні cookie:</strong> Ці файли необхідні для коректної
            роботи сайту та забезпечення його безпеки. Наприклад, вони
            дозволяють зберігати товари в кошику або входити у ваш акаунт.
          </li>
          <li>
            <strong>Функціональні cookie:</strong> Дозволяють запам’ятовувати
            ваші налаштування для покращення зручності користування. Наприклад,
            вони можуть зберігати вибір мови або налаштування інтерфейсу.
          </li>
          <li>
            <strong>Аналітичні cookie:</strong> Збирають інформацію про
            використання сайту, наприклад, які сторінки ви переглядаєте, скільки
            часу проводите на сайті тощо — це дозволяє нам його вдосконалювати.
          </li>
          <li>
            <strong>Рекламні cookie:</strong> Використовуються для показу
            персоналізованих рекламних оголошень, які можуть вас зацікавити.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          4. Як керувати файлами cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Ви можете змінювати налаштування cookie у своєму браузері. Більшість
          браузерів дозволяють блокувати або видаляти cookie. Однак пам’ятайте,
          що це може вплинути на функціональність деяких частин нашого сайту.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          5. Як вимкнути файли cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Щоб вимкнути cookie, виконайте наступні дії у вашому браузері:
        </Typography>
        <ul>
          <li>
            <strong>Google Chrome:</strong> Перейдіть у Налаштування &gt;
            Конфіденційність і безпека &gt; Файли cookie та інші дані сайтів і
            оберіть бажані параметри.
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Перейдіть у Налаштування &gt;
            Приватність і безпека &gt; Історія та налаштуйте параметри cookie.
          </li>
          <li>
            <strong>Safari:</strong> Перейдіть у Налаштування &gt; Safari &gt;
            Конфіденційність та виберіть потрібні опції.
          </li>
          <li>
            <strong>Microsoft Edge:</strong> Перейдіть у Налаштування &gt;
            Конфіденційність, пошук і служби &gt; Файли cookie та оберіть
            потрібні параметри.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          6. Зміни в Політиці щодо файлів cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Ми можемо періодично оновлювати нашу Політику щодо файлів cookie. Усі
          зміни будуть опубліковані на цій сторінці з зазначенням дати
          останнього оновлення.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          7. Контактна інформація
        </Typography>
        <Typography variant="body1" paragraph>
          Якщо у вас є запитання щодо нашої Політики щодо файлів cookie, будь
          ласка, зв’яжіться з нами за адресою:
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

export default CookiePolicyPage;
