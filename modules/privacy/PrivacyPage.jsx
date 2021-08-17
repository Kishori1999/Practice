import React from "react";
import styled from "styled-components";
import LegalPageLayout from "../shared/LegalPageLayout";
import { IntroHeading, Paragraph, MainList, ListItem, List, SectionHeading } from "../shared/legals";

const Content = styled.div`
  counter-reset: section;
`;

const PrivacyPage = () => (
  <LegalPageLayout title="PRIVACY POLICY">
    <Content>
      <IntroHeading>Leonis Pty Ltd Privacy Policy</IntroHeading>
      <Paragraph>This privacy policy was last modified on 23rd March 2021.</Paragraph>
      <MainList>
        <SectionHeading>About our Privacy Policy</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              The privacy of your Personal Information is important to Leonis Pty Ltd (ACN 639 363 447). We respect your
              rights to privacy and rights under the Privacy Act and are committed to complying with the requirements of
              the Privacy Law in the collection and handling of your Personal Information.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              This policy explains how we collect, retain, process, share, transfer and handle your Personal Information
              and describes the kinds of Personal Information we collect, use, disclose and our purposes for doing so.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              We use some defined terms in this policy. You can find the meaning of each defined term at the end of this
              policy.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              Personal Information is information which may be used to reasonably identify you. For example, your name,
              address, date of birth, gender, email address, telephone number is generally considered to be Personal
              Information. Personal Information may also include information we collect about your individual
              preferences.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              This policy applies to your Personal Information when you use our Website, and interact generally with us
              but does not apply to Third Party Sites. We are not responsible for the privacy policies or content of
              Third Party Sites.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              For the avoidance of doubt, unless stated otherwise, this policy will govern our collection of your
              Personal Information irrespective of the forum.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              This policy may be updated from time to time and the most up to date version will be published on our
              Website. We encourage you to check our Website periodically to ensure that you are aware of our current
              policy.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              Your continued usage of our Website and/or services will be taken to indicate your acceptance of the terms
              of this privacy policy insofar as it relates to our Website.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>Why we collect Personal Information</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              When you visit our Website, we collect Personal Information so that we can provide you with products and
              services and improve and customise your experience with us. We only collect Personal Information if it is
              reasonably necessary for us to carry out our functions and activities.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>The purposes for which we collect and hold your Personal Information include:</Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>to deliver our products and services to you;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to manage our relationship with you, evaluate our business performance and build our customer database;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>to respond to your requests and seek your feedback;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to conduct research, compare information for accuracy and verification purposes, compile or analyse
                statistics relevant to the operations of our business;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to facilitate our internal business operations, including fulfilment of any legal and regulatory
                requirements and monitoring, analysing and improving the performance and functionality of our Website
                and investigating breaches of or enforcement of any legal terms applicable to our Website;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to protect our property, the Website or our legal rights including to create backups of our business
                records;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to manage risk and protect our Website from fraud by verifying your identity and helping to detect and
                prevent fraudulent use of our Website;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>for the direct marketing and promotional purposes as set out below; and</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to manage our business, including analysing data collected from our Website concerning visits and
                activities of users on our Website including the Analytics Services. This analysis helps us run our
                Website more efficiently and improve and personalise your experience online.
              </Paragraph>
            </ListItem>
          </List>
        </List>
        <SectionHeading>What Personal Information do we collect?</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              The kinds of Personal Information we collect will depend on the type of interaction you have with us.
              Generally, the kinds of Personal Information we collect may include:
            </Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>
                your name, address (postal and residential), email address, telephone number(s), date of birth and
                gender when you register with us;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                information from third party sources such as data providers and credit organisations, where permitted by
                law, including public blockchain data such as your nominated public key for a digital asset wallet;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                details of the device you have used to access any part of our Website, including carrier/operating
                system, connection type, IP address and other information may be collected and used by us automatically
                if you use our Website, through the browser on your device or otherwise;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>demographic information;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>location data;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>your connections with others whose personal information we may collect or hold;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                online payment details which may include blockchain transaction data, third party payment systems,
                credit or direct debit details for your bank account in order to process transactions contemplated by
                our services; and
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>transaction details relating to your use of our products, services or rewards.</Paragraph>
            </ListItem>
          </List>
          <ListItem>
            <Paragraph>
              Telephone calls to us may also be recorded for training and quality assurance purposes.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>With whom do we share Personal Information?</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>We may disclose Personal Information collected from you:</Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>
                to our related entities, employees, officers, agents, contractors, other companies that provide services
                to us, sponsors, government agencies or other third parties to satisfy the purposes for which the
                information was collected (as outlined in clause 2.2 of this policy) or for another purpose if that
                other purpose is closely related to the primary purpose of collection and an individual would reasonably
                expect us to disclose the information for that secondary purpose;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to third parties who help us to verify the identity of our clients and customers, and other software
                service providers who assist us to provide the services we provide to you;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to third parties who help us analyse the information we collect so that we can administer, support,
                improve or develop our business and the services we provide to you;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to merchants and the recipients of funds to identify you as the sender of the funds and to a party whom
                sends you funds in connection with a transfer to you of funds;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to third parties, including those in the blockchain and fintech industry, marketing and advertising
                sectors, to use your information in order to let you know about goods and services which may be of
                interest to you in accordance with the SPAM Act 2003 (Cth) and the Privacy Act;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                if the disclosure is required by a law, or legal process, requested by a government agency or other
                third parties pursuant to a subpoena, court or other legal process with which we are required to comply,
                including in relation to our obligations under the Anti-Money Laundering and Counter Terrorism Financing
                Act 2006 (Cth);
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to our professional advisers such as consultants, bankers, professional indemnity insurers, brokers and
                auditors so that we can meet our regulatory obligations, and administer, support, improve or develop our
                business;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>to debt recovery agencies who assist us with the recovery of debts owed to us;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>to any other person, with your consent (express or implied); and</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                to facilitate the sale of all or a substantial part of our assets or business or to companies with which
                we propose to merge or who propose to acquire us and their advisers.
              </Paragraph>
            </ListItem>
          </List>
          <ListItem>
            <Paragraph>
              In addition to the above recipients, we will disclose your Personal Information if we are required to do
              so under law or if the disclosure is made in connection with either the normal operation of our business
              in a way that you might reasonably expect, for example, if such disclosure is incidental to IT services
              being provided to our business or for the resolution of any dispute that arises between you and us. This
              disclosure may involve your Personal Information being transmitted Overseas.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              In the event of a proposed restructure or sale of our business (or part of our business) or where a
              company proposes to acquire or merge with us, we may disclose Personal Information to the buyer and their
              advisers without your consent subject to compliance with the Privacy Law. If we sell the business and the
              sale is structured as a share sale, you acknowledge that this transaction will not constitute the
              ‘transfer’ of Personal Information.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>How we collect and store data and transmit Personal Information</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              We usually collect and store information including in paper, physical and electronic form provided by you
              when you communicate with us by telephone, email, web-based form, letter, facsimile or other means,
              including when:
            </Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>you contact us over the phone;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>we provide you with our services via telephone, email or our Website;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>we provide you with assistance or support for our products or services;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                you participate in our functions, events or activities or on our social media pages;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                you request that we provide you with information concerning our products or services;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>you upload or submit information to us or our Website; or</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                you complete any forms requesting information from you, including on registration with us, complete any
                survey or provide feedback to us concerning our products or services.
              </Paragraph>
            </ListItem>
          </List>
          <ListItem>
            <Paragraph>
              Where practicable we will only collect information from you personally. However, we will also collect your
              Personal Information through our partners and third parties who supply services to us.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              Please note that we use our own and third party computer servers including our Website hosts, data backups
              and payment gateway(s), which may be located Overseas and your Personal Information will likely be stored
              and transmitted Overseas as part of the normal operation of our business.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              We also collect information from your computer or mobile device automatically when you browse our Website.
              This information may include:
            </Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>the date and time of your visit;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>your domain;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>locality;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>operating system;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>the server your computer or mobile is using to access our Website;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>your browser and version number;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>search terms you have entered to find our Website or access our Website;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>pages and links you have accessed both on our Website and on other websites;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>the last website you visited;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>the pages of our Website that you access;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>the device you use to access our Website; and</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>your IP Address.</Paragraph>
            </ListItem>
          </List>
          <ListItem>
            <Paragraph>
              While we do not use some of this information to identify personally, we may record certain information
              about your use of our Website such as which pages you visit and the time and date of your visit and that
              information could potentially be used to identify you.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              It may be possible for us to identify you from information collected automatically from your visit(s) to
              our Website. If you have registered an account with us, we will able to identify you through your user
              name and password when you log into our Website. Further, if you access our Website via links in an email
              we have sent you, we will be able to identify you.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              The device you use to access our Website may collect information about you including your location using
              longitude and latitude co-ordinates obtained through GPS, Wi-Fi or cell site tri-angulation. For
              information about your ability to restrict the collection and use of such information, please use the
              settings available on your device.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              We may use statistical analytics software tools and software known as cookies which transmit data to third
              party servers located Overseas. To our knowledge, our analytic providers do not identify individual users
              or associate your IP Address with any other data held by them.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>How we protect your Personal Information</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              We will endeavour to take all reasonable steps to keep secure and protect any Personal Information which
              we hold about you, including:
            </Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>securing our physical premises and digital storage media;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                using computer safeguards such as Secure Socket Layer (SSL) technology to ensure that your information
                is encrypted and sent across the Internet securely;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                placing password protection and access control over our information technology systems and databases to
                limit access and protect electronic information from unauthorised interference, access, modification and
                disclosure; and
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>taking regular back-ups of our electronic systems.</Paragraph>
            </ListItem>
          </List>
          <ListItem>
            <Paragraph>
              Notwithstanding that we will take all reasonable steps to keep your Personal Information secure, data
              transmission over the internet is never guaranteed to be completely secure. We do not and cannot warrant
              the security of any information you transmit to us or from any online services.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>Use of Cookies</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              When you visit our Website or the website of any of our partners, we and our partners may use cookies and
              other tracking technology (Cookies) to recognise you and customise your online experience. Cookies are
              small files that store information on your computer, mobile phone or other device. They enable us to
              recognise you across different websites, services, devices and/or browsing sessions. Cookies also assist
              us to customise online content and advertising, save your preferences for future visits to the Website,
              measure the effectiveness of our promotions, prevent potential fraud and analyse your and other users’
              interactions with the Website.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              If you do not wish to grant us the right to use cookies to gather information about you while you are
              using our Website, then you may set your browser settings to delete, disable or block certain Cookies.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              You may be requested to consent to use of Cookies when you access certain parts of our Website, for
              example, when you are asked if you want the Website to “remember” certain things about you.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              Certain aspects and features of the Website are only available through use of Cookies. If you disable
              Cookies, your use of the Website may be limited or not possible or parts of our Website may not function
              properly when you use them.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>How we use Personal Information for communicating with you and direct marketing</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              We may communicate with you by phone, email, SMS or push notification, to inform you about existing and
              new products and services that may be of interest to you.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              We will ensure that any email we send as direct marketing complies with the SPAM Act 2003 (Cth) and
              contain an ‘unsubscribe’ option so that you can remove yourself from any further marketing communications.
              To opt-out of communications via SMS, reply with “STOP”. You may decline marketing messages sent by push
              notifications by refusing the relevant permission in your phone or tablet settings, however this setting
              will prevent you from receiving other messages from us via push notification. You may also opt-out of
              receiving marketing materials from us using the contact details set out below.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              You can also call or write to us to request that your details be removed from our direct marketing list.
              We will endeavour to remove your details from our direct marketing list within a reasonable time
              (ordinarily 5 working days).
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              Our direct marketing list may be operated by software and servers located Overseas and your Personal
              Information may be sent Overseas as part of our marketing.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              We will also send communications that are required or necessary to send to users of our Website that
              contain information about important changes or developments to or the operation of the Website or as well
              as other communications you request from us. You may not opt out of receiving these communications but you
              may be able to adjust the media and format through which you receive these notices.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>Not identifying yourself</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>It may be impracticable to deal with you on an anonymous basis or using a pseudonym.</Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              We may be able to provide you with limited information in the absence of your identifying yourself but
              generally we will be unable to provide you with any information, goods and/or services unless you have
              identified yourself.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>
          How to access or correct your Personal Information or make an enquiry or complaint
        </SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              If you have any queries in relation to this policy, you wish to access or correct the Personal Information
              we hold about you, or make a complaint, please contact us in writing at:
            </Paragraph>
            <Paragraph>Email: team@guildofguardians.com or</Paragraph>
            <Paragraph>Mail: Privacy Officer</Paragraph>
            <Paragraph>Leonis Pty Ltd</Paragraph>
            <Paragraph>74-76 Campbell Street, Surry Hills, Sydney 2000, NSW Australia</Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              We aim to acknowledge receipt of all privacy complaints from you within 10 working days and resolve all
              complaints within 60 business days. Where we cannot resolve a complaint within that period, we will notify
              you of the reason for the delay as well as advising the time by which we expect to resolve the complaint.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              In order to disclose information to you in response to a request for access we may require you to provide
              us with certain information to verify your identity. There are exceptions under the Privacy Law which may
              affect your right to access your Personal Information – these exceptions include where (amongst other
              things):
            </Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>access would pose a serious threat to the life, health or safety of any individual;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>access would have an unreasonable impact on the privacy of others;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>the request for access is frivolous or vexatious;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                the information relates to existing or anticipated legal proceedings between you and us and the
                information would not otherwise be accessible by the process of discovery;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>giving access would reveal our intentions in relation to negotiations with you;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>giving access would be unlawful;</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                denying access is required or authorised by or under an Australia law or a court/tribunal;
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>the information relates to commercial sensitive decision making process; or</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>giving access would prejudice enforcement related action.</Paragraph>
            </ListItem>
          </List>
          <ListItem>
            <Paragraph>
              We may (depending on the request) charge you a fee to access the Personal Information. We will inform you
              of any fees payable in respect of accessing your Personal Information prior to actioning your request. All
              requests for Personal Information will be handled in a reasonable period of time (within 60 calendar days
              after the request is made).
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              If you wish to have your Personal Information deleted, please contact us using the details above and we
              will take reasonable steps to delete the information (unless we are obliged to keep it for legal or
              auditing purposes). To the extent that any Personal Information is stored on a blockchain it may be
              impracticable, unfeasible or impossible to delete.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              In the event that you believe that there has been a breach of the Privacy Law, we invite you to contact us
              as soon as possible.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              If you are not satisfied with our handling of a complaint or the outcome of a complaint you may make an
              application to:
            </Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>
                the Office of the Australian Information Commissioner by visiting{" "}
                <a href="http://www.oaic.gov.au">www.oaic.gov.au</a>, emailing
                <a href="mailto:enquiries@oaic.gov.au"> enquiries@oaic.gov.au</a>; or writing to GPO Box 5218 Sydney NSW
                2001; or
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>the Privacy Commissioner in your State or Territory.</Paragraph>
            </ListItem>
          </List>
        </List>
      </MainList>
      <List>
        <SectionHeading>Notifiable Data Breach</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              We are bound by the Privacy Act and are committed to complying with the Notifiable Data Breaches Scheme
              (NDB) established by the Privacy Amendment (Notifiable Data Breaches) Act 2017.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              The NDB requires that where a data breach is likely to result in serious harm to any individuals to whom
              the information relates, we are required to notify those individuals and the Office of the Australian
              Information Commissioner.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              The NDB provides greater protection to the personal information of consumers, greater transparency in the
              way organisations like us respond to data breaches and give you the opportunity to minimise the damage
              caused by any unauthorised use of your Personal Information.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>Changes to this Privacy Policy</SectionHeading>
        <List>
          <ListItem>
            <Paragraph>
              We may amend this privacy policy from time to time at our sole discretion, particularly where we need to
              take into account and cater for any:
            </Paragraph>
          </ListItem>
          <List>
            <ListItem>
              <Paragraph>business developments; or</Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>legal or regulatory developments.</Paragraph>
            </ListItem>
          </List>
          <ListItem>
            <Paragraph>
              If we make changes, we will notify you by revising the date at the top of the Privacy Policy and, in some
              cases, may provide you with additional notice (such as adding a statement to the Website homepage or
              sending you a notification). We recommend you review the Privacy Policy whenever you access the Services
              or otherwise interacts with us to stay informed about our information practices and the ways you can help
              us to protect your privacy.
            </Paragraph>
          </ListItem>
        </List>
        <SectionHeading>Definitions used in this policy</SectionHeading>
        <List>
          <List>
            <ListItem>
              <Paragraph>
                <b>Analytics Services</b> includes but not limited to Google Analytics
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>Australian Privacy Principles</b> or <b>APPs</b> means the principles set out in Schedule 1 to the
                Privacy Act.
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>IP Address</b> means a number automatically assigned to your computer which is required when you are
                using the internet and which may be able to be used to identify you.
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>Overseas</b> includes the following countries: United States of America.
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>Personal Information</b> has the meaning set out in the Privacy Act.
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>Privacy Act</b> means the Privacy Act 1988 (Cth) as amended from time to time.
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>Privacy Law</b> means such laws as may place requirements on the handling of Personal Information
                under the Privacy Act and the Australian Privacy Principles.
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>Third Party Sites</b> means online websites or services that we do not own or control, including
                websites of our partners
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>Website</b>
                <a href="http://www.guildofguardians.com">www.guildofguardians.com</a>
                and/or any other website as we may operate from time to time.
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>we, our, us</b> and similar terms means Leonis Pty Ltd and our related entities.
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph>
                <b>you, your</b> and similar terms means, as the context requires (1) you, when you use our Website;
                and/or (2) you, during your dealings with us as a customer; and/or (3) any agent providing your Personal
                information to us; and/or (4) any agent dealing with us on your behalf.
              </Paragraph>
            </ListItem>
          </List>
        </List>
      </List>
    </Content>
  </LegalPageLayout>
);

export default PrivacyPage;
