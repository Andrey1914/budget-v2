"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Container, Box, Typography, Link } from "@mui/material";

const LicenseAgreementPage: React.FC = () => {
  const router = useRouter();

  const handleLinkPrivacy = () => {
    router.push("/landing/privacy");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Ліцензійна угода
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Ця Ліцензійна угода (далі — &quot;Угода&quot;) регулює умови
          використання програмного забезпечення та послуг, наданих компанією
          [Назва компанії], включно з усіма оновленнями, покращеннями,
          модифікаціями та документацією.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          1. Прийняття умов
        </Typography>
        <Typography variant="body1" paragraph>
          Використовуючи наше програмне забезпечення або послуги, ви
          погоджуєтеся з умовами цієї Угоди. Якщо ви не згодні з будь-яким із
          пунктів, вам слід негайно припинити використання програмного
          забезпечення або послуг.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          2. Ліцензія на використання
        </Typography>
        <Typography variant="body1" paragraph>
          Компанія надає вам обмежену, невиключну та непередавану ліцензію на
          використання нашого програмного забезпечення в межах цієї Угоди. Ви
          можете використовувати програмне забезпечення лише відповідно до його
          призначення та згідно з умовами цієї Угоди.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          3. Обмеження
        </Typography>
        <Typography variant="body1" paragraph>
          Вам заборонено:
        </Typography>
        <ul>
          <li>
            Модифікувати, змінювати, розповсюджувати або створювати похідні
            продукти на основі програмного забезпечення.
          </li>
          <li>
            Продавати, здавати в оренду або передавати права на використання
            програмного забезпечення третім особам.
          </li>
          <li>
            Використовувати програмне забезпечення з незаконною метою або
            порушувати закони вашої юрисдикції.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          4. Інтелектуальна власність
        </Typography>
        <Typography variant="body1" paragraph>
          Усі права на програмне забезпечення, включно з усіма правами
          інтелектуальної власності, належать компанії [Назва компанії] або її
          ліцензіарам. Ви не отримуєте жодних прав на програмне забезпечення,
          окрім тих, що прямо надані в межах цієї Угоди.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          5. Оновлення та модифікації
        </Typography>
        <Typography variant="body1" paragraph>
          Компанія може на власний розсуд випускати оновлення або модифікації
          програмного забезпечення. Усі такі оновлення або модифікації
          підпадають під умови цієї Угоди.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          6. Відповідальність
        </Typography>
        <Typography variant="body1" paragraph>
          Компанія не несе відповідальності за будь-які прямі, непрямі,
          випадкові або штрафні збитки, що виникли внаслідок використання
          програмного забезпечення або неможливості його використання, включно з
          втратою даних або прибутку, навіть якщо компанія була попереджена про
          можливість таких збитків.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          7. Конфіденційність
        </Typography>
        <Typography variant="body1" paragraph>
          Усі дані, зібрані під час використання програмного забезпечення,
          обробляються відповідно до нашої{" "}
          <Link onClick={() => handleLinkPrivacy()} underline="hover">
            Політики конфіденційності
          </Link>
          .
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          8. Зміни до Угоди
        </Typography>
        <Typography variant="body1" paragraph>
          Компанія залишає за собою право змінювати умови цієї Ліцензійної угоди
          в будь-який час. Зміни набувають чинності з моменту їх публікації на
          сайті. Рекомендується періодично перевіряти оновлення Угоди.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          9. Припинення дії угоди
        </Typography>
        <Typography variant="body1" paragraph>
          Компанія може припинити дію цієї Угоди у випадку порушення вами її
          умов. У разі припинення вам необхідно негайно припинити використання
          програмного забезпечення та видалити всі його копії з ваших пристроїв.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          10. Контактна інформація
        </Typography>
        <Typography variant="body1" paragraph>
          Якщо у вас виникли питання щодо умов цієї Ліцензійної угоди, ви можете
          зв’язатися з нами:
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

export default LicenseAgreementPage;
