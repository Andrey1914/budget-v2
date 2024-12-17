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
          Лицензионное соглашение
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Это Лицензионное соглашение (далее &quot;Соглашение&quot;) регулирует
          условия использования программного обеспечения и услуг,
          предоставляемых компанией [Название компании], включая все обновления,
          улучшения, модификации и документацию.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          1. Принятие условий
        </Typography>
        <Typography variant="body1" paragraph>
          Используя наше программное обеспечение или услуги, вы соглашаетесь с
          условиями данного Соглашения. Если вы не согласны с любым из условий,
          вам следует немедленно прекратить использование программы или услуг.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          2. Лицензия на использование
        </Typography>
        <Typography variant="body1" paragraph>
          Компания предоставляет вам ограниченную, неисключительную и
          непередаваемую лицензию на использование нашего программного
          обеспечения в рамках соглашения. Вы можете использовать программное
          обеспечение только в соответствии с его назначением и в пределах
          условий данного Соглашения.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          3. Ограничения
        </Typography>
        <Typography variant="body1" paragraph>
          Вы не имеете права:
        </Typography>
        <ul>
          <li>
            Модифицировать, изменять, распространять или создавать производные
            работы на основе программного обеспечения.
          </li>
          <li>
            Продавать, сдавать в аренду или передавать права на использование
            программного обеспечения третьим лицам.
          </li>
          <li>
            Использовать программное обеспечение для незаконных целей или
            нарушать законы вашей юрисдикции.
          </li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          4. Интеллектуальная собственность
        </Typography>
        <Typography variant="body1" paragraph>
          Все права на программное обеспечение, включая все интеллектуальные
          права собственности, принадлежат компании [Название компании] или ее
          лицензиарам. Вы не приобретаете никаких прав на программное
          обеспечение за исключением прав, прямо предоставленных в рамках
          данного Соглашения.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          5. Обновления и модификации
        </Typography>
        <Typography variant="body1" paragraph>
          Компания может по своему усмотрению выпускать обновления или
          модификации программного обеспечения. Все такие обновления или
          модификации будут подчиняться условиям этого Соглашения.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          6. Ответственность
        </Typography>
        <Typography variant="body1" paragraph>
          Компания не несет ответственности за любые прямые, косвенные,
          случайные или штрафные убытки, возникшие в результате использования
          программного обеспечения или его невозможности использования, включая
          потерю данных или прибыли, даже если компания была предупреждена о
          возможности таких убытков.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          7. Конфиденциальность
        </Typography>
        <Typography variant="body1" paragraph>
          Все данные, собранные в процессе использования программного
          обеспечения, будут обрабатываться в соответствии с нашей{" "}
          <Link onClick={() => handleLinkPrivacy()} underline="hover">
            Политикой конфиденциальности
          </Link>
          .
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          8. Изменения в Соглашении
        </Typography>
        <Typography variant="body1" paragraph>
          Компания оставляет за собой право изменять условия данного
          Лицензионного соглашения в любое время. Изменения вступают в силу с
          момента их публикации на сайте. Рекомендуется периодически проверять
          обновления Соглашения.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          9. Прекращение действия соглашения
        </Typography>
        <Typography variant="body1" paragraph>
          Компания может прекратить действие данного Соглашения в случае
          нарушения вами его условий. В случае прекращения действия соглашения
          вам необходимо немедленно прекратить использование программного
          обеспечения и удалить все копии с ваших устройств.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          10. Контактная информация
        </Typography>
        <Typography variant="body1" paragraph>
          Если у вас возникли вопросы по поводу условий данного Лицензионного
          соглашения, вы можете связаться с нами:
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

export default LicenseAgreementPage;
