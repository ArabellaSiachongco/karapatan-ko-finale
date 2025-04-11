import React from "react";
import { styles } from "../../../../styles.js";
import { SectionWrapper } from "../../../HOC";
import "../../../../index.css";
import { useNavigate } from "react-router-dom";

const TermsAndConditions_magalgalit = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className={`${styles.AiText} highlight-border`}>
        Mga Tuntunin at Kundisyon para sa Privacy ng Data
      </h1>
      <h2 className={`${styles.paragraphSubText} mt-4`}>
        Patakaran sa Privacy at Seguridad ng Data
      </h2>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        1. Pagkolekta at Paggamit ng Data
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        Kinokolekta at pinoproseso namin ang data ng user para lamang sa layunin
        ng pagbibigay ng legal na impormasyon, serbisyo, at komunikasyon. Sa
        paggamit ng aming website, sumasang-ayon ka sa pagkolekta, paggamit, at
        pagproseso ng iyong data ayon sa patakarang ito.
        <br />
        <i>
          We collect and process user data solely for the purpose of providing
          legal information, services, and communication...
        </i>
      </p>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        2. Proteksyon at Seguridad ng Data
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        Gumagamit kami ng mga industry-standard na hakbang sa seguridad upang
        maprotektahan ang data ng user, kabilang ang encryption, secure na
        server, at access control. Gayunpaman, walang paraan ng online
        transmission na 100% secure, at hindi namin maipapangako ang ganap na
        seguridad.
        <br />
        <i>
          We implement industry-standard security measures to protect user
          data...
        </i>
      </p>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        3. Pagbabahagi sa Iba
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        Hindi namin ibinebenta, inuupa, o ibinabahagi ang personal na data sa
        iba maliban kung:
      </p>
      <ul>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Kinakailangan ng batas.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Kailangan para sa mga serbisyong hiniling (hal. legal na
          konsultasyon).
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • May pahintulot mula sa user.
        </li>
      </ul>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        4. Patakaran sa Data Breach
      </h3>
      <p className={`${styles.dictionaryText} text-white`}>
        Sa kaso ng data breach, kami ay:
      </p>
      <ul>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Magbibigay-alam agad sa mga apektadong user sa pamamagitan ng email
          o paabiso sa website.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Magbibigay ng detalye tungkol sa insidente at kung anong data ang
          naapektuhan.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Magsasagawa ng mga hakbang upang maiwasan ang mga susunod na
          insidente.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Mag-uulat sa mga awtoridad kung kinakailangan ng batas.
        </li>
      </ul>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        5. Mga Karapatan at Responsibilidad ng User
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        May karapatan ang user na:
      </p>
      <ul>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Humiling ng access sa kanilang data.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Humiling ng pagwawasto o pagbura ng personal na impormasyon.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Bawiin ang pahintulot sa pagproseso ng data.
        </li>
      </ul>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        Responsibilidad ng user na panatilihing ligtas ang kanilang login
        credentials at i-report agad ang anumang kahina-hinalang aktibidad.
      </p>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        6. Disclaimer at Limitasyon ng Pananagutan
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        Habang kami ay nagsasagawa ng mga hakbang upang maprotektahan ang data,
        hindi kami responsable sa mga hindi awtorisadong pag-access o insidente
        ng hacking na wala sa aming kontrol. Naiintindihan ng user ang mga
        panganib ng pagbabahagi ng data online at sumasang-ayon sa limitasyon ng
        aming pananagutan alinsunod sa batas.
      </p>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        7. Mga Pagbabago sa Patakarang Ito
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        Nananatili sa amin ang karapatang baguhin ang patakarang ito anumang
        oras. Aabisuhan ang user sa anumang malaking pagbabago sa pamamagitan ng
        email o abiso sa website.
      </p>

      <p className="mt-4">
        <strong>
          Sa paggamit ng website na ito, kinikilala at sinasang-ayunan mong
          sumunod sa mga patakarang ito.
        </strong>
      </p>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={() => navigate("/appointmentLawyer1")}
          className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-red-900"
        >
          Bumalik
        </button>
      </div>
    </div>
  );
};

export default SectionWrapper(TermsAndConditions_magalgalit);
