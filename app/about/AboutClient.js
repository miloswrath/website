'use client';

import { format, intervalToDuration, parseISO } from 'date-fns';
import Image from 'next/image';
import React from 'react';

import { AnimatedIcon } from '../../components/AnimatedIcon';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import Toast from '../../components/Toast';
import items from '../../data/about';
import copyBioIcon from '../../public/static/icons/copy-bio.json';
import downloadIcon from '../../public/static/icons/download.json';

export default function AboutClient({ description }) {
  const [toastTitle, setToastTitle] = React.useState('');
  const [toastDescription, setToastDescription] = React.useState('');
  const [showToast, setShowToast] = React.useState(false);
  const copyBioRef = React.useRef();
  const downloadRef = React.useRef();

  const renderIntro = () => {
    return (
      <div className="flex flex-col justify-between md:flex-row">
        <div className="mt-0 w-auto md:w-84">
          <Image
            alt="Zak Gilliam"
            src="/static/images/avatar.jpg"
            width="336"
            height="336"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </div>
        <div className="mt-0 w-auto md:w-[48%]">
          <p className="mt-4 md:my-3.75 md:-mt-1.5">
            <strong>Hey, I&apos;m Zak Gilliam. </strong>
             I&apos;m currently the Lead Developer for Data Platform & AI Systems at HBC Lab, University of Iowa. I have a passion for building tools that empower researchers to leverage AI in their work.
          </p>
          <p className="md:my-3.75">
            I have a background in psychology and human-computer interaction, which gives me a unique perspective on how to design and build user-friendly tools. I&apos;m particularly interested in supporting experts in their work, and I&apos;m always looking for ways to use technology to improve people&apos;s lives.
          </p>
          <p className="md:my-3.75">
            <strong>I love dark mode</strong>, open source, and using technology to make a difference.
            When I&apos;m not working, I like gaming, watching movies, and{' '}
            <strong>playing guitar</strong>
          </p>
        </div>
      </div>
    );
  };

  const renderBio = () => {
    return (
      <div>
        <p>
          This is made for journalists, podcast hosts, and event organizers to
          copy-and-paste.
        </p>
        <blockquote>
          <p>{description}</p>
        </blockquote>
        <div className="flex items-center">
          <ButtonPrimary
            as="button"
            className="inline-flex items-center justify-center"
            onClick={copyBio}
            onMouseEnter={() => copyBioRef.current?.play()}
            onMouseLeave={() => copyBioRef.current?.stop()}
          >
            <AnimatedIcon
              lottieRef={copyBioRef}
              animationData={copyBioIcon}
              loop={false}
              autoplay={false}
              className="mr-2"
            />
            Copy Bio
          </ButtonPrimary>
          <span className="mt-0 mr-5 mb-0 ml-2.5">•</span>
          <ButtonPrimary
            as="a"
            download
            role="button"
            href="/static/images/avatar.jpg"
            className="inline-flex items-center justify-center"
            onClick={downloadHeadshot}
            onMouseEnter={() => downloadRef.current?.play()}
            onMouseLeave={() => downloadRef.current?.stop()}
          >
            <AnimatedIcon
              lottieRef={downloadRef}
              animationData={downloadIcon}
              loop={false}
              autoplay={false}
              className="mr-2"
            />
            Download Headshot
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderAll = () => {
    return items.map((item) => {
      return (
        <div className="mb-10" key={`${item.companyUrl}-${item.startDate}`}>
          <h3>{item.jobTitle}</h3>
          <p className="m-0">
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p className="m-0">
            <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy')
                : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      );
    });
  };

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date()
    });

    let durationStr = '';

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `;
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `;
    }

    const months = durationObj.months ?? 0;
    if (months > 0) {
      durationStr += `${months} mos`;
    }

    return durationStr.trim();
  };

  const downloadHeadshot = () => {
    setToastTitle('Downloading...');
    setToastDescription('You can now add this photo to your fancy site.');
    setShowToast(true);
  };

  const copyBio = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(description);

    setToastTitle('Copied :D');
    setToastDescription('You can now paste it anywhere.');
    setShowToast(true);
  };

  return (
    <>
      {renderIntro()}
      <h2>Bio</h2>
      {renderBio()}
      <h2>Career</h2>
      {renderAll()}
      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  );
}
